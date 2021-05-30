using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Numerics;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Entities.Responses;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GameController : ControllerBase {
        private IUserRepository userRepository;
        private ITaskRepository taskRepository;

        private IMapper mapper;
        private IConfiguration config;

        public GameController(IMapper mapper, IUserRepository userRepository, IConfiguration config, ITaskRepository
                                  taskRepository) {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.config = config;
            this.taskRepository = taskRepository;
        }

        [AllowAnonymous]
        [HttpGet("leaderboard")]
        public IActionResult GetLeaderboard() {
            // Get list of top 10 user
            var top10 = mapper.Map<IEnumerable<UserProfileResponse>>(userRepository.GetLeaderboard(10));

            return Ok(top10);
        }

        [HttpGet("check")]
        public IActionResult CheckTask(int taskId, float latitude, float longitude) {
            var userId = AuthController.GetUserIdFromPrincipal(Request, config["JWT:Secret"]);
            var user = userRepository.GetUserById(userId);
            if (user == null) return BadRequest();

            var response = new TaskCompletionResponse();

            var dbTask = taskRepository.GetTask(taskId);
            if (dbTask == null) return BadRequest();

            if (dbTask.Assigned < DateTime.Today) return Ok(response);

            // If within 50 meters (roughly)
            if (MathF.Abs(dbTask.Latitude.Value - latitude) <= 0.0005f &&
                MathF.Abs(dbTask.Longitude.Value - longitude) <= 0.0005f) {
                if (dbTask.Completed != null) return Ok(response);

                // Mark task as completed by adding completion date
                dbTask.Completed = DateTime.Now;
                taskRepository.UpdateTask(dbTask);

                switch (dbTask.TaskType) {
                    case TaskType.NATURE:
                        user.Nature += dbTask.Points;
                        break;
                    case TaskType.KNOWLEDGE:
                        user.Knowledge += dbTask.Points;
                        break;
                    case TaskType.FITNESS:
                        user.Fitness += dbTask.Points;
                        break;
                    case TaskType.COMMUNITY:
                        user.Community += dbTask.Points;
                        break;
                }

                userRepository.UpdateUser(user);
                response.CompletedTasks.Add(mapper.Map<TaskResponse>(dbTask));
            }

            taskRepository.Save();
            userRepository.Save();

            return Ok(response);
        }

        [HttpGet("generate")]
        public IActionResult GenerateTasks(float latitude, float longitude) {
            var client = new HttpClient();
            var userId = AuthController.GetUserIdFromPrincipal(Request, config["JWT:Secret"]);

            // Get user
            var user = userRepository.GetUserById(userId);
            // If user claims to be nonexistent user
            if (user == null) return BadRequest();

            // Generate 5 new tasks
            var tasks = new List<TaskModel>();
            for (int i = 0; i < 5; i++) {
                string description = "";
                string title = "";
                string text = "";
                string address = "";
                int type = -1;

                var taskLoc = RandomPoint(latitude, longitude, MilesToMeters(5));

                // Make mapbox request with random keyword
                try {
                    var response = client.GetFromJsonAsync<GeocodingResponse>("https://api.mapbox.com/geocoding" +
                                                                              $"/v5/mapbox.places/{taskLoc.Y},{taskLoc.X}.json" +
                                                                              $"?access_token={config["mapbox"]}" +
                                                                              "&types=poi" +
                                                                              "&language=en").Result;

                    // If there was no address associated with the point, fallback to this information
                    if (response.Features.Length == 0) {
                        type = (int) TaskType.FITNESS;
                        title = "Go on a run";
                        description =
                            "Get out there, get moving! Increasing your Fitness is a great way to stay in shape.";
                        text = "Point of Interest";
                    } else {
                        // TODO: Fix possible duplicate points
                        
                        // There was a valid address associated with this point
                        var categories = response.Features[0].Properties.Category.Split(", ");
                        address = response.Features[0].Properties.Address ?? "";
                        text = response.Features[0].Text;

                        foreach (var category in categories) {
                            if (!Categories.ContainsKey(category)) continue;
                            type = (int) Categories[category];
                            break;
                        }

                        // Default to Fitness category
                        if (type == -1) {
                            type = (int) TaskType.FITNESS;
                        }

                        switch (type) {
                            case (int) TaskType.NATURE:
                                title = "Take a walk";
                                description =
                                    "Go out and see the sunshine! Take a break from your devices and enjoy what nature has to offer.";
                                break;
                            case (int) TaskType.FITNESS:
                                title = "Go on a run";
                                description =
                                    "Get out there, get moving! Increasing your Fitness is a great way to stay in shape.";
                                break;
                            case (int) TaskType.COMMUNITY:
                                title = "Meet new people";
                                description = "It's time to meet new friends! Go out and expand your circle.";
                                break;
                            case (int) TaskType.KNOWLEDGE:
                                title = "Visit this institution";
                                description = "Knowledge is power! Visit this location to increase your Knowledge.";
                                break;
                        }
                    }
                    
                    var task = new TaskModel {
                        Assigned = DateTime.Now,
                        Completed = null,
                        Title = title,
                        Description = description,
                        TaskType = (TaskType) type,
                        Points = Math.Min(25 + (int) (75 * MathF.Sqrt(MathF.Pow(latitude - taskLoc.X, 2) +
                                                 MathF.Pow(longitude - taskLoc.Y, 2)) / 5) * 5, 50),
                        Latitude = taskLoc.X,
                        Longitude = taskLoc.Y,
                        Address = address,
                        Text = text,
                        User = user
                    };

                    taskRepository.AddTask(task);
                    tasks.Add(task);
                } catch (HttpRequestException e) {
                    Console.WriteLine("Could not connect to MapBox.");
                }
            }


            taskRepository.Save();

            return Ok(mapper.Map<IEnumerable<TaskResponse>>(tasks));
        }

        private Vector2 RandomPoint(float centerX, float centerY, float radius) {
            Random rand = new Random();
            var r1 = (float) rand.NextDouble();
            var r2 = (float) rand.NextDouble();

            float radiusInDeg = radius / 111300f;

            float theta = 2 * MathF.PI * r1;
            float w = radiusInDeg * MathF.Sqrt(r2);

            float xOffset = w * MathF.Cos(theta);
            float yOffset = w * MathF.Sin(theta);

            float xAdj = xOffset / MathF.Cos(centerY);

            return new Vector2(centerX + xAdj, centerY + yOffset);
        }

        private Vector4 BBox(float centerX, float centerY, float halfWidth) {
            float r = (MilesToMeters(halfWidth)) / 6371000f;
            float lat = (MathF.PI / 180f) * centerX;
            float lon = (MathF.PI / 180f) * centerY;

            float latMin = lat - r;
            float latMax = lon + r;

            float deltaLon = MathF.Asin(MathF.Sin(r) / MathF.Cos(lat));

            float lonMin = lon - deltaLon;
            float lonMax = lon + deltaLon;

            return new Vector4(lonMin, latMin, lonMax, latMax) * (180f / MathF.PI);
        }

        private float MilesToMeters(float miles) {
            return miles * 1609.344f;
        }

        private Dictionary<string, TaskType> Categories = new() {
            { "beach", TaskType.NATURE },
            { "garden", TaskType.NATURE },
            { "park", TaskType.NATURE },
            { "outdoors", TaskType.NATURE },
            { "lake", TaskType.NATURE },
            { "forest", TaskType.NATURE },
            { "woods", TaskType.NATURE },
            { "campground", TaskType.NATURE },
            { "tour", TaskType.NATURE },
            { "zoo", TaskType.NATURE },
            { "aquarium", TaskType.NATURE },
            { "wildlife sanctuary", TaskType.NATURE },
            { "mountain", TaskType.NATURE },
            { "hiking", TaskType.NATURE },

            { "university", TaskType.KNOWLEDGE },
            { "education", TaskType.KNOWLEDGE },
            { "school", TaskType.KNOWLEDGE },
            { "computer", TaskType.KNOWLEDGE },
            { "electronic", TaskType.KNOWLEDGE },
            { "museum", TaskType.KNOWLEDGE },
            { "newsstand", TaskType.KNOWLEDGE },
            { "newspaper", TaskType.KNOWLEDGE },
            { "news", TaskType.KNOWLEDGE },
            { "magazine", TaskType.KNOWLEDGE },
            { "photography", TaskType.KNOWLEDGE },
            { "martial arts", TaskType.KNOWLEDGE },
            { "utility", TaskType.KNOWLEDGE },
            { "repair", TaskType.KNOWLEDGE },
            { "college classrooms", TaskType.KNOWLEDGE},

            { "airport", TaskType.COMMUNITY },
            { "amusement park", TaskType.COMMUNITY },
            { "theme park", TaskType.COMMUNITY },
            { "brewery", TaskType.COMMUNITY },
            { "casinos", TaskType.COMMUNITY },
            { "college", TaskType.COMMUNITY },
            { "combat sports", TaskType.COMMUNITY },
            { "church", TaskType.COMMUNITY },
            { "dance", TaskType.COMMUNITY },
            { "dog park", TaskType.COMMUNITY },
            { "restaurant", TaskType.COMMUNITY },
            { "hotel", TaskType.COMMUNITY },
            { "pet", TaskType.COMMUNITY },
            { "pool", TaskType.COMMUNITY },
            { "mall", TaskType.COMMUNITY },
            { "shopping center", TaskType.COMMUNITY },
            { "shop", TaskType.COMMUNITY },
            { "playground", TaskType.COMMUNITY },
        };
    }
}