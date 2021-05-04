using SlideSync.Data.Context;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Data.Repositories {
    public class AuthUnit : IAuthUnit {
        public ITokenRepository Tokens { get; }
        public IUserRepository Users { get; }
        private readonly GameDbContext context;

        public AuthUnit(GameDbContext context, ITokenRepository tokens, IUserRepository users) {
            this.context = context;
            Tokens = tokens;
            Users = users;
        }
        
        public int Complete() {
            return context.SaveChanges();
        }
    }
}