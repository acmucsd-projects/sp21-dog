using System;
using System.ComponentModel.DataAnnotations;

namespace SlideSync.Data.Entities.Models {
    public class RefreshToken {
        [Key]
        public int Id { get; set; }
        
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime Created { get; set; }
        public DateTime? Revoked { get; set; }
        public string ReplacedBy { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
        
        public UserModel User { get; set; }
    }
}