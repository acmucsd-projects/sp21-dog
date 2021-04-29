using System.Collections.Generic;
using SlideSync.Data.Entities;

namespace SlideSync.Data.Repositories.Contracts {
    public interface IUserRepository {
        IEnumerable<UserModel> GetUsers();
        IEnumerable<UserModel> GetLeaderboard(int count);
        UserModel GetUserById(int id);
        UserModel GetUserByUsername(string username);
        void AddUser(UserModel user);
        void DeleteUser(UserModel user);
        void DeleteUserById(int id);
        void DeleteUserByUsername(string username);
        void UpdateUser(UserModel user);
        void Save();
    }
}