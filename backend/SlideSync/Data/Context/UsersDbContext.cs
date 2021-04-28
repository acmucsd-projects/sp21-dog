using Microsoft.EntityFrameworkCore;
using SlideSync.Data.Entities;

namespace SlideSync.Data.Context {
    public class UsersDbContext : DbContext {
        public DbSet<UserModel> Users { get; set; }

        public UsersDbContext(DbContextOptions<UsersDbContext> options) : base(options) {
            
        }
    }
}