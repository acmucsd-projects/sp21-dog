using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Requests {
    public class UserEditPasswordRequest {
        [Required] public string OldPassword { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string NewPassword { get; set; }
    }
}