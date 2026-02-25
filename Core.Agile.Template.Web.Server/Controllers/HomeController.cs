using Microsoft.AspNetCore.Mvc;

namespace Core.Agile.Template.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Welcome to Core Agile Template Web Server" });
    }
}
