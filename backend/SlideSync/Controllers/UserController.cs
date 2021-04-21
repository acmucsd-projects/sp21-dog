using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace SlideSync.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase {
        public UserController(ILogger logger) {
            
        }
    }
}