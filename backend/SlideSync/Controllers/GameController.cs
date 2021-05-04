using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlideSync.Data.Entities.Responses;
using SlideSync.Data.Repositories.Contracts;

namespace SlideSync.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GameController : ControllerBase {
        private IUserRepository userRepository;
        private IMapper mapper;
        
        public GameController(IMapper mapper, IUserRepository userRepository) {
            this.userRepository = userRepository;
            this.mapper = mapper;

        }

        [AllowAnonymous]
        [HttpGet("leaderboard")]
        public IActionResult GetLeaderboard() {
            // Get list of top 10 user
            var top10 = mapper.Map<IEnumerable<UserProfileResponse>>(userRepository.GetLeaderboard(10));
            
            return Ok(top10);
        }
    }
}