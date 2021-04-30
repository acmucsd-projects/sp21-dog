using System;
using System.Collections.Generic;

namespace SlideSync.Data.Entities.Models {
    public class UserModel {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public int Points { get; set; } = 0;
        public DateTime JoinDate { get; set; }
        public int FactionId { get; set; } = -1;
        public int GuildId { get; set; } = -1;
        public int Experience { get; set; } = 0;
        
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}