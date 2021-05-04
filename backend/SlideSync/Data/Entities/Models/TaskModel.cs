using System;
using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Models {
    public enum TaskType {
        FITNESS = 0, 
        NATURE,
        KNOWLEDGE,
        COMMUNITY
    }

    public enum Difficulty {
        EASY = 0,
        MEDIUM,
        HARD,
        INSANE
    }
    
    public class TaskModel {
        [Key]
        public int Id { get; set; }
        public TaskType TaskType { get; set; }
        public Difficulty Difficulty { get; set; }
        public int Points { get; set; }
        public int Duration => (Completed - Assigned)?.Seconds ?? -1;
        public DateTime Assigned { get; set; }
        public DateTime? Completed { get; set; }
        public string Description { get; set; }
        public UserModel User { get; set; }
    }
}