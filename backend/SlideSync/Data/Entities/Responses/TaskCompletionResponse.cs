using System.Collections.Generic;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Entities.Responses {
    public class TaskCompletionResponse {
        public List<TaskResponse> CompletedTasks { get; set; }

        public TaskCompletionResponse() {
            CompletedTasks = new List<TaskResponse>();
        }
        
    }
}