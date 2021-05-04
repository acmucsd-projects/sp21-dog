using System;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Entities.Responses {
    public class TaskResponse {
        public TaskType TaskType { get; set; }
        public Difficulty Difficulty { get; set; }
        public int Points { get; set; }
        public int Duration { get; set; }
        public DateTime Assigned { get; set; }
        public DateTime? Completed { get; set; }
        public string Description { get; set; }
    }
}