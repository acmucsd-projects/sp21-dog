using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SimpleCrypto;
using SlideSync.Config;
using SlideSync.Data.Entities;
using SlideSync.Data.Entities.Dto;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Controllers {
    [ApiController]
    [Route("api/auth")]
    public class UserController : ControllerBase {
        private readonly JwtConfig config;
        private readonly IUserRepository userRepository;
        private ICryptoService cryptoService;
        private IMapper mapper;
        public UserController(IOptions<JwtConfig> config, IUserRepository userRepository, IMapper mapper) {
            this.config = config.Value;
            this.userRepository = userRepository;
            this.mapper = mapper;
            cryptoService = new PBKDF2();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromForm] UserRegistrationDto register) {
            // Open DB connection
            if (userRepository.GetUserByUsername(register.Username) != null) {
                return Conflict("User already exists");
            }
            
            // Write user info
            var user = mapper.Map<UserModel>(register);

            // Hash password
            user.Password = cryptoService.Compute(register.Password);
            user.PasswordSalt = cryptoService.Salt;
            
            user.JoinDate = DateTime.Now;
            
            // Save/close DB
            userRepository.AddUser(user);
            userRepository.Save();

            // TODO: Add user DTO
            return CreatedAtRoute("", "");
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromForm] UserLoginDto login) {
            var user = AuthenticateUser(login);

            // TODO: Implement login
            if (user != null) {
                // Generate and return token
                return Ok(GenerateJWT(user));
            }
            
            return Unauthorized("Invalid username or password");
        }

        private string GenerateJWT(UserModel userInfo) {
            var secret = config.Secret;
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor() {
                Subject = new ClaimsIdentity(new Claim[] {
                   new(ClaimTypes.NameIdentifier, userInfo.Id.ToString()) 
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        /**
         * Authenticates the user, checking the provided password against the password hash stored in the database
         */
        private UserModel AuthenticateUser(UserLoginDto login) {
            var user = userRepository.GetUserByUsername(login.Username);
            // User does not exist
            if (user == null) return null;

            var hash = cryptoService.Compute(login.Password, user.PasswordSalt);

            return (hash == user.Password) ? user : null;
            
        }
    }
}