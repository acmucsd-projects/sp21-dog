namespace SlideSync.Data.Entities.Responses {
    public class UserLoginResponse {
        public string Jwt { get; set; }

        public UserLoginResponse(string jwt) {
            this.Jwt = jwt;
        }
    }
}