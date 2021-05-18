using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SlideSync.Data.Context;
using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Data.Repositories {
    public class UserRepository : IUserRepository {
        private readonly GameDbContext context;

        public UserRepository(GameDbContext context) {
            this.context = context;
        }
        
        public IEnumerable<UserModel> GetUsers() {
            return context.Users.ToList();
        }

        public IEnumerable<UserModel> GetLeaderboard(int count) {
            return context.Users.OrderByDescending(user => user.Points).Take(count).AsEnumerable();
        }

        public UserModel GetUserById(int id) {
            return context.Users.Find(id);
        }

        public UserModel GetUserByUsername(string username) {
            return context.Users.FirstOrDefault(user => user.Username == username);
        }

        public void AddUser(UserModel user) {
            context.Users.Add(user);
        }

        public void DeleteUser(UserModel user) {
            if (user == null) {
                throw new InvalidOperationException("Cannot remove user: user does not exist");
            }
            context.Users.Remove(user);
        }

        public void DeleteUserById(int id) {
            var user = context.Users.Find(id);
            if (user == null) {
                throw new InvalidOperationException("Cannot remove user: user does not exist");
            }
            context.Users.Remove(user);
        }

        public void DeleteUserByUsername(string username) {
            var user = context.Users.FirstOrDefault(userModel => userModel.Username == username);
            if (user == null) {
                throw new InvalidOperationException("Cannot remove user: user does not exist");
            }
            context.Users.Remove(user);
        }

        public void UpdateUser(UserModel user) {
            context.Users.Update(user);
        }

        public void Save() {
            context.SaveChanges();
        }
    }
}