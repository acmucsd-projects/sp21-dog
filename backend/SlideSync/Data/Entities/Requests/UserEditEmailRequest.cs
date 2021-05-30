using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Requests {
    public class UserEditEmailRequest {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}