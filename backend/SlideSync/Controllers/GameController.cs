using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
        public IActionResult CheckTasks(float latitude, float longitude) {
            var userId = AuthController.GetUserIdFromPrincipal(Request, config["JWT:Secret"]);
            var user = userRepository.GetUserById(userId);
            if (user == null) return BadRequest();

            var response = new TaskCompletionResponse();

            var tasksToday = mapper.Map<IEnumerable<TaskResponse>>(
                taskRepository.GetTasksByUserId(userId)
                    .Where(t => DateTime.Compare(t.Assigned, DateTime.Today) >= 0));

            foreach (var task in tasksToday) {
                if (!task.Latitude.HasValue) continue;
                if (!task.Longitude.HasValue) continue;

                if (MathF.Abs(task.Latitude.Value - latitude) <= 0.0005f &&
                    MathF.Abs(task.Longitude.Value - longitude) <= 0.0005f) {

                    var dbTask = taskRepository.GetTask(task.Id);
                    if (dbTask.Completed != null) continue;
                    
                    dbTask.Completed = DateTime.Now;
                    taskRepository.UpdateTask(dbTask);
                    
                    switch (task.TaskType) {
                        case TaskType.NATURE:
                            user.Nature += task.Points;
                            break;
                        case TaskType.KNOWLEDGE:
                            user.Knowledge += task.Points;
                            break;
                        case TaskType.FITNESS:
                            user.Fitness += task.Points;
                            break;
                        case TaskType.COMMUNITY:
                            user.Community += task.Points;
                            break;
                    }
                    userRepository.UpdateUser(user);
                    
                    response.CompletedTasks.Add(task);
                }
            }
            
            taskRepository.Save();
            userRepository.Save();
            
            return Ok(response);
        }

        [HttpGet("generate")]
        public IActionResult GenerateTasks(float latitude, float longitude) {
            var userId = AuthController.GetUserIdFromPrincipal(Request, config["JWT:Secret"]);
            
            // Get user
            var user = userRepository.GetUserById(userId);
            // If user claims to be nonexistent user
            if (user == null) return BadRequest();

            var tasks = new List<TaskModel>();
            // Generate new task
            Random rand = new Random();
            for (int i = 0; i < 5; i++) {
                var type = rand.Next(0, 4);
                string description = "";

                switch (type) {
                    case (int) TaskType.NATURE:
                        description =
                            "Go out and see the sunshine! Take a break from your devices and enjoy what nature has to offer.";
                        break;
                    case (int) TaskType.FITNESS:
                        description = "Get out there, get moving!";
                        break;
                    case (int) TaskType.COMMUNITY:
                        description = "It's time to meet new friends! Go out and expand your circle.";
                        break;
                    case (int) TaskType.KNOWLEDGE:
                        description = "Knowledge is power!";
                        break;
                }

                var taskLoc = RandomPoint(latitude, longitude, MilesToMeters(5));

                var task = new TaskModel {
                    Assigned = DateTime.Now,
                    Completed = null,
                    Description = description,
                    TaskType = (TaskType) type,
                    Points = 25,
                    Latitude = taskLoc.X,
                    Longitude = taskLoc.Y,
                    User = user
                };

                taskRepository.AddTask(task);
                tasks.Add(task);
            }

            taskRepository.Save();

            return Ok(mapper.Map<IEnumerable<TaskResponse>>(tasks));
        }

        private Vector2 RandomPoint(float centerX, float centerY, float radius) {
            Random rand = new Random(); 
            var r1 = (float) rand.NextDouble();
            var r2 = (float) rand.NextDouble();
            
            float radiusInDeg = radius / 111300f;
            
            float theta = 2 *  MathF.PI * r1;
            float w = radiusInDeg * MathF.Sqrt(r2);

            float xOffset = w * MathF.Cos(theta);
            float yOffset = w * MathF.Sin(theta);

            float xAdj = xOffset / MathF.Cos(centerY);

            return new Vector2(centerX + xAdj, centerY + yOffset);
        }

        private float MilesToMeters(float miles) {
            return miles * 1609.344f;
        }
    }
}