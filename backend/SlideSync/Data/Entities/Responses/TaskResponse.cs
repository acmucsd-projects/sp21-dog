using System;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Entities.Responses {
    public class TaskResponse {
        public int Id { get; set; }
        public TaskType TaskType { get; set; }
        public int Points { get; set; }
        public int Duration { get; set; }
        public DateTime Assigned { get; set; }
        public DateTime? Completed { get; set; }
        public string Title { get; set;  }
        public string Description { get; set; }
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
    }
}