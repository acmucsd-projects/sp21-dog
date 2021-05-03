using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Models {
    // TODO: Profile Picture
    public class UserModel {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        
        public int Points => Fitness + Nature + Community + Knowledge;
        public int Fitness { get; set; } = 0;
        public int Nature { get; set; } = 0;
        public int Community { get; set; } = 0;
        public int Knowledge { get; set; } = 0;
        
        public DateTime JoinDate { get; set; }
        public int FactionId { get; set; } = -1;
        public int GuildId { get; set; } = -1;
        
        public List<RefreshToken> RefreshTokens { get; set; }
        public List<TaskModel> Tasks { get; set; }

    }
}