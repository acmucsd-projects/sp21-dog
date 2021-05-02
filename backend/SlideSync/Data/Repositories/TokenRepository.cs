using System;
using System.Linq;
using System.Security.Cryptography;
using SlideSync.Data.Context;
using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Data.Repositories {
    public class TokenRepository : ITokenRepository {
        private readonly GameDbContext context;

        public TokenRepository(GameDbContext context) {
            this.context = context;
        }


        public RefreshToken GetToken(string token) {
            return context.RefreshTokens.SingleOrDefault(t => t.Token == token);
        }

        public void AddToken(RefreshToken token) {
            context.Add(token);
        }

        public void UpdateToken(RefreshToken token) {
            context.Update(token);
        }
    }
}