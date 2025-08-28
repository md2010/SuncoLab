using Microsoft.AspNetCore.Mvc;
using SuncoLab.Model;

namespace SuncoLab.Controllers
{
    [ApiController]
    [Route("home")]
    public class HomeController(ILogger<HomeController> logger) : ControllerBase
    {
        [HttpGet]
        [Route("items")]
        public IActionResult Get([FromQuery] SearchRequest request)
        {
            List<string> items = ["first", "second", "third"];
            return Ok(items.Take(request.PageSize));
        }
    }
}
