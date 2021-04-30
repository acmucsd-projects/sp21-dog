using System.Text.Json.Serialization;

namespace SlideSync.Data.Entities.Models {
    public class AuthenticationModel {
        public UserModel User { get; set; }
        public string AuthToken { get; set; }
        public RefreshToken RefreshToken { get; set; }

        public AuthenticationModel(UserModel user, string authToken, RefreshToken refreshToken) {
            User = user;
            AuthToken = authToken;
            RefreshToken = refreshToken;
        }
    }
}