using System;

namespace SlideSync.Data.Entities.Dto {
    public class UserReadDto {
        public string Username { get; set; }
        public string First { get; set; }
        public string Last { get; set; }
        public int Points { get; set; }
        public DateTime JoinDate { get; set; }
        public int FactionId { get; set; }
        public int GuildId { get; set; }
        public int Experience { get; set; }
    }
}