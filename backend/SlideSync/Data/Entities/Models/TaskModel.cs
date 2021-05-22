using System;
using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Models {
    public enum TaskType {
        FITNESS = 0, 
        NATURE,
        KNOWLEDGE,
        COMMUNITY
    }
    
    public class TaskModel {
        [Key]
        public int Id { get; set; }
        public TaskType TaskType { get; set; }
        public int Points { get; set; }
        public int Duration => (Completed - Assigned)?.Seconds ?? -1;
        public DateTime Assigned { get; set; }
        public DateTime? Completed { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        
        public float? Latitude { get; set; }
        public float? Longitude { get; set; }
        public UserModel User { get; set; }
    }
}