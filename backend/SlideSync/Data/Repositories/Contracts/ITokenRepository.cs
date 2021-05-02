using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Models;

namespace SlideSync.Data.Repositories.Contracts {
    public interface ITokenRepository {
        public RefreshToken GetToken(string token);
        public void AddToken(RefreshToken token);
        public void UpdateToken(RefreshToken token);
    }
}