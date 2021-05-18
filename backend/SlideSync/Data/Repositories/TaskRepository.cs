using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SlideSync.Data.Context;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Data.Repositories {
    public class TaskRepository : ITaskRepository {
        private readonly GameDbContext context;
        
        public TaskRepository(GameDbContext context) {
            this.context = context;
        }
        
        public TaskModel GetTask(int id) {
            return context.Tasks.Find(id);
        }

        public int AddTask(TaskModel task) {
            return context.Tasks.Add(task).Entity.Id;
        }

        public IEnumerable<TaskModel> GetTasksByUserId(int userId) {
            return context.Tasks.Where(t => t.User.Id == userId);
        }

        public IEnumerable<TaskModel> GetTasksByUsername(string username) {
            var userId = context.Users.Find(username);
            if (userId == null) return null;

            return GetTasksByUserId(userId.Id);
        }
        public void UpdateTask(TaskModel task) {
            context.Tasks.Update(task);
        }

        public void Save() {
            context.SaveChanges();
        }
    }
}