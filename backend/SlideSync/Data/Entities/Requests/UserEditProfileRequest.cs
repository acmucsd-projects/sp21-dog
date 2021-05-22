using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Requests {
    public class UserEditProfileRequest {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Bio { get; set; }
    }
}