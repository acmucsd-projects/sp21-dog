using System;

namespace SlideSync.Data.Entities.Responses {
    public class UserProfileResponse {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public int TasksCompleted { get; set; }
        public int Level => ((int) Math.Sqrt(625 + 100 * Points) - 25) / 50 + 1;
        public int Points { get; set; }
        public int Fitness { get; set; }
        public int Nature { get; set; }
        public int Community { get; set; }
        public int Knowledge { get; set; }
        
        public DateTime JoinDate { get; set; }
        public int FactionId { get; set; }
        public int GuildId { get; set; }
    }
}