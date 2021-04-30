using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SimpleCrypto;
using SlideSync.Config;
using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Models;
using SlideSync.Data.Entities.Requests;
using SlideSync.Data.Entities.Responses;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Controllers {
    // TODO: Refactor into auth controller
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase {
        #region Fields

        private readonly JwtConfig config;
        private readonly IAuthUnit authUnit;
        private ICryptoService cryptoService;
        private IMapper mapper;
        #endregion
        
        public UserController(IOptions<JwtConfig> config, IAuthUnit authUnit, IMapper  mapper) {
            this.authUnit = authUnit;
            this.mapper = mapper;
            this.config = config.Value;
            
            cryptoService = new PBKDF2();
        }

        #region Routes
        [AllowAnonymous]
        [HttpGet("user/{username}", Name = nameof(GetUser))]
        public IActionResult GetUser(string username) {
            // Search for user in db
            var user = authUnit.Users.GetUserByUsername(username);
            if (user == null) {
                return NotFound();
            }

            // Return user info
            var userReadDto = mapper.Map<UserProfileResponse>(user);
            return Ok(userReadDto);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromForm] UserRegistrationRequest register) {
            // Open DB connection
            if (authUnit.Users.GetUserByUsername(register.Username) != null) {
                return Conflict("User already exists");
            }
            
            // Write user info
            var user = mapper.Map<UserModel>(register);

            // Hash password
            user.Password = cryptoService.Compute(register.Password);
            user.PasswordSalt = cryptoService.Salt;
            
            user.JoinDate = DateTime.Now;
            
            // Save/close DB
            authUnit.Users.AddUser(user);
            authUnit.Complete();

            var userDto = mapper.Map<UserProfileResponse>(user);

            return CreatedAtRoute(nameof(GetUser), new { username = userDto.Username }, userDto);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromForm] UserLoginRequest login) {
            var user = AuthenticateUser(login);

            if (user == null) return Unauthorized("Invalid username or password");
            
            var refreshToken = AuthController.GenerateRefreshToken(user);
            authUnit.Tokens.AddToken(refreshToken);
            user.RefreshTokens.Add(refreshToken);
            authUnit.Complete();
            
            SetCookie(refreshToken);
                
            // Generate and return token
            return Ok(AuthController.GenerateJWT(user, config));
        }
        
        private void SetCookie(RefreshToken refreshToken) {
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append(AuthController.refreshTokenCookie, refreshToken.Token, cookieOptions);
        }
        

        [AllowAnonymous]
        [HttpGet("refresh-token")]
        public IActionResult RefreshToken() {
            // Get refresh token
            var refreshToken = Request.Cookies[refreshTokenCookie];
            var authToken = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]).Parameter;
            
            // Validate tokens
            var authModel = ValidateTokens(authToken, refreshToken);
            if (authModel == null) return BadRequest();
            
            // Generate new tokens
            var newRefreshToken = GenerateRefreshToken(authModel.User);
            var newAuthToken = GenerateJWT(authModel.User);
            
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

        [AllowAnonymous]
        [HttpPost("revoke-token")]
        public ActionResult RevokeToken([FromForm] string? token) {
            var requestedToken = token ?? Request.Cookies[refreshTokenCookie];

            if (string.IsNullOrEmpty(requestedToken)) {
                return BadRequest();
            }

            // Get token and revoke it
            var refreshToken = authUnit.Tokens.GetToken(requestedToken);
            if (refreshToken == null || !refreshToken.IsActive) return BadRequest("Invalid token");
            refreshToken.Revoked = DateTime.Now;
            
            // Update and save db
            authUnit.Tokens.UpdateToken(refreshToken);
            authUnit.Complete();

            return Ok();
        }
        
        private void SetCookie(RefreshToken refreshToken) {
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append(AuthController.refreshTokenCookie, refreshToken.Token, cookieOptions);
        }
        

        /**
         * Authenticates the user, checking the provided password against the password hash stored in the database
         */
        private UserModel AuthenticateUser(UserLoginRequest login) {
            var user = authUnit.Users.GetUserByUsername(login.Username);
            // User does not exist
            if (user == null) return null;

            var hash = cryptoService.Compute(login.Password, user.PasswordSalt);

            return (hash == user.Password) ? user : null;
            
        }
        
        #endregion
    }
}