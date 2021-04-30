using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SlideSync.Config;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Repositories;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Controllers {
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase {
        private readonly JwtConfig config;
        private readonly IAuthUnit authUnit;
        public static readonly string refreshTokenCookie = "refreshToken";
        
        public AuthController(IOptions<JwtConfig> config, IAuthUnit authUnit) {
            this.config = config.Value;
            this.authUnit = authUnit;
        }
        
        [HttpGet("refresh")]
        public IActionResult RefreshToken() {
            // Get refresh token
            var refreshToken = Request.Cookies[refreshTokenCookie];
            var authToken = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]).Parameter;
            
            // Validate tokens
            var authModel = ValidateTokens(authToken, refreshToken);
            if (authModel == null) return BadRequest();
            
            // Generate new tokens
            var newRefreshToken = GenerateRefreshToken(authModel.User);
            var newAuthToken = GenerateJWT(authModel.User, config);
            
            // Revoke old refresh token
            authModel.RefreshToken.Revoked = DateTime.UtcNow;
            authModel.RefreshToken.ReplacedBy = newRefreshToken.Token;

            // Add new refresh token
            authUnit.Tokens.AddToken(newRefreshToken);
            // Update existing tokens
            authUnit.Tokens.UpdateToken(authModel.RefreshToken);

            // Save context
            authUnit.Complete();

            // Append to cookies
            SetCookie(newRefreshToken);

            return Ok(newAuthToken);
        }

        [HttpPost("revoke")]
        public IActionResult RevokeToken([FromForm] string token) {
            // Get token from request
            var requestedToken = token ?? Request.Cookies[refreshTokenCookie];
            if (string.IsNullOrEmpty(refreshTokenCookie)) return BadRequest("Invalid token");
            
            // Get token from database
            var refreshToken = authUnit.Tokens.GetToken(requestedToken);
            if (refreshToken == null || !refreshToken.IsActive) return BadRequest("Invalid token");
            
            // Revoke token
            refreshToken.Revoked = DateTime.UtcNow;
            authUnit.Tokens.UpdateToken(refreshToken);
            authUnit.Complete();

            return Ok();
        }
        
        private AuthenticationModel ValidateTokens(string authToken, string refreshToken) {
            if (authToken == null || refreshToken == null) return null;
            
            // Validate auth token
            var principal = GetPrincipal(authToken);
            if (principal == null) {
                return null;
            }
            // Try to get name id from claim
            var claim = principal.Claims.FirstOrDefault(c => c.Type is ClaimTypes.NameIdentifier);
            if (claim == null) {
                return null;
            }
            var user = authUnit.Users.GetUserById(int.Parse(claim.Value));
            // If user claims to be nonexistent user
            if (user == null) {
                return null;
            }
            
            // Validate refresh token
            var existingRefreshToken = authUnit.Tokens.GetToken(refreshToken);
            if (existingRefreshToken == null) {
                return null;
            }
            // If token doesn't belong to claimed user or it's a stale token
            if (existingRefreshToken.User.Id != user.Id || !existingRefreshToken.IsActive) {
                return null;
            }

            return new AuthenticationModel(user, authToken, existingRefreshToken);
        }
        
        private ClaimsPrincipal GetPrincipal(string token) {
            var handler = new JwtSecurityTokenHandler();

            try {
                var claimsPrincipal = handler.ValidateToken(token, new TokenValidationParameters {
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.Secret))
                }, out _);
                
                return claimsPrincipal;
            } catch {
                return null;
            }
        }
        
        private void SetCookie(RefreshToken refreshToken) {
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append(refreshTokenCookie, refreshToken.Token, cookieOptions);
        }
        
        internal static RefreshToken GenerateRefreshToken(UserModel user) {
            var randomNumber = new byte[64];
            RandomNumberGenerator.Create().GetBytes(randomNumber);
            
            var refreshToken = new RefreshToken {
                Token = Convert.ToBase64String(randomNumber),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                User = user
            };

            return refreshToken;
        }
        
        internal static string GenerateJWT(UserModel userInfo, JwtConfig config) {
            var secret = config.Secret;
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[] {
                    new(ClaimTypes.NameIdentifier, userInfo.Id.ToString()) 
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}