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
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase {
        #region Fields

        private readonly JwtConfig config;
        private readonly IAuthUnit authUnit;
        private readonly ITaskRepository taskRepository;
        private ICryptoService cryptoService;
        private IMapper mapper;
        #endregion
        
        public UserController(IOptions<JwtConfig> config, IAuthUnit authUnit, ITaskRepository taskRepository, IMapper  mapper) {
            this.authUnit = authUnit;
            this.taskRepository = taskRepository;
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

            var tasksCompleted = taskRepository.GetTasksByUserId(user.Id).Count(t => t.Completed != null);

            // Return user info
            var userReadDto = mapper.Map<UserProfileResponse>(user);
            userReadDto.TasksCompleted = tasksCompleted;
            return Ok(userReadDto);
        }
        
        [Authorize]
        [HttpGet("user/{username}/tasks")]
        public IActionResult GetTasks(string username) {
            // Get header value of token
            var token = GetAuthorizationHeader(Request);
            
            // Get ID from claim
            var userId = token.Claims.First(c => c.Type == "nameid").Value;
            var id = int.Parse(userId);
            
            // If claimed user is not requested user, user is unauthorized
            var user = authUnit.Users.GetUserByUsername(username);
            if (user == null) return NotFound();
            if (id != user.Id) return Unauthorized();

            var tasks = taskRepository.GetTasksByUserId(id);
            var tasksResponse = mapper.Map<IEnumerable<TaskResponse>>(tasks);

            return Ok(tasksResponse);
        }

        [Authorize]
        [HttpGet("user/{username}/edit")]
        public IActionResult EditProfile(string username) {
			if (authUnit.Users.GetUserByUsername(username) == null) return NotFound();

            var userId = AuthController.GetUserIdFromPrincipal(Request, config.Secret);

            var user = authUnit.Users.GetUserById(userId);
            // Validate user
            if (user == null) {
                return NotFound();
            }

            if (user.Username != username) {
                return Unauthorized();
            }
            return Ok(mapper.Map<UserPersonalResponse>(user));
        }

        [Authorize]
        [HttpPost("user/{username}/edit")]
        public IActionResult EditProfile(string username, [FromForm] UserEditProfileRequest editProfileRequest) {
			if (authUnit.Users.GetUserByUsername(username) == null) return NotFound();
            var userId = AuthController.GetUserIdFromPrincipal(Request, config.Secret);

            var user = authUnit.Users.GetUserById(userId);
            // Validate user
            if (user == null) {
                return NotFound();
            }
            
            if (user.Username != username) {
                return Unauthorized();
            }

            if (editProfileRequest.Username != user.Username) {
                if (editProfileRequest.Username == string.Empty 
                    || authUnit.Users.GetUserByUsername(editProfileRequest.Username) != null) {
                    return BadRequest();
                }
            }

            // Apply mapping and update user
            mapper.Map(editProfileRequest, user);
            authUnit.Users.UpdateUser(user);
            authUnit.Complete();

            return NoContent();
        }

        [Authorize]
        [HttpPost("user/{username}/edit-email")]
        public IActionResult EditEmail(string username, [FromForm] UserEditEmailRequest editEmailRequest) {
            var userId = AuthController.GetUserIdFromPrincipal(Request, config.Secret);

            var user = authUnit.Users.GetUserById(userId);
            // Validate user
            if (user == null) {
                return NotFound();
            }
            if (user.Username != username) {
                return Unauthorized();
            }
            
            // Apply mapping and update user
            mapper.Map(editEmailRequest, user);
            authUnit.Users.UpdateUser(user);
            authUnit.Complete();

            return NoContent();
        }

        [Authorize]
        [HttpPost("user/{username}/edit-password")]
        public IActionResult EditPassword(string username, [FromForm] UserEditPasswordRequest editRequest) {
            var userId = AuthController.GetUserIdFromPrincipal(Request, config.Secret);

            var user = authUnit.Users.GetUserById(userId);
            // Validate user
            if (user == null) {
                return NotFound();
            }

            if (user.Username != username) {
                return Unauthorized();
            }

            // Compare existing password
            var oldHash = cryptoService.Compute(editRequest.OldPassword, user.PasswordSalt);
            if (!cryptoService.Compare(user.Password, oldHash)) {
                return BadRequest();
            }

            // Set new password
            var newHash = cryptoService.Compute(editRequest.NewPassword);
            user.Password = newHash;
            user.PasswordSalt = cryptoService.Salt;

            authUnit.Users.UpdateUser(user);
            authUnit.Complete();
            
            return NoContent();
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

            user.DisplayName = register.Username;
            
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
            authUnit.Complete();
            
            SetCookie(refreshToken);
                
            // Generate and return token
            return Ok(new UserLoginResponse(AuthController.GenerateJWT(user, config)));
        }
        
        private void SetCookie(RefreshToken refreshToken) {
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append(AuthController.refreshTokenCookie, refreshToken.Token, cookieOptions);
        }
        #endregion

        #region Helpers
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

        public static JwtSecurityToken GetAuthorizationHeader(HttpRequest request) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var headerToken = AuthenticationHeaderValue.Parse(request.Headers["Authorization"]).Parameter;
            return tokenHandler.ReadJwtToken(headerToken);
        }
        #endregion
    }
}
