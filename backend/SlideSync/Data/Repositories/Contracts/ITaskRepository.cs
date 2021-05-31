using System.Collections.Generic;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Repositories.Contracts {
    public interface ITaskRepository {
        public TaskModel GetTask(int id);
        public int AddTask(TaskModel task);
        public IEnumerable<TaskModel> GetTasksByUserId(int userId);
        public IEnumerable<TaskModel> GetTasksByUsername(string username);
        public void UpdateTask(TaskModel task);
        public void Save();
    }
}