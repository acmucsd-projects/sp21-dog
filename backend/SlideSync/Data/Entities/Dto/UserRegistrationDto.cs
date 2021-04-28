#nullable enable
using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Dto {
    public class UserRegistrationDto {
        [Required(ErrorMessage = "Username is a required field")]
        public string Username { get; set; }
        
        public string? First { get; set; }
        public string? Last { get; set; }
        
        [EmailAddress]
        [Required(ErrorMessage = "Email address is required")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; }
    }
}