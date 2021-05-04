using Microsoft.EntityFrameworkCore;
using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Context {
    public class GameDbContext : DbContext {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<TaskModel> Tasks { get; set; }

        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.RefreshTokens)
                .WithOne(t => t.User)
                .IsRequired();

            modelBuilder.Entity<UserModel>()
                .HasMany(u => u.Tasks)
                .WithOne(t => t.User)
                .IsRequired();

            modelBuilder.Entity<TaskModel>()
                .Property(t => t.TaskType)
                .HasConversion<int>();
            modelBuilder.Entity<TaskModel>()
                .Property(t => t.Difficulty)
                .HasConversion<int>();

        }
    }
}