using Microsoft.AspNetCore.Mvc;

namespace Core.Agile.Template.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GlobalController : ControllerBase
{
    private readonly ILogger<GlobalController> _logger;

    public GlobalController(ILogger<GlobalController> logger)
    {
        _logger = logger;
    }

    [HttpGet("health")]
    public IActionResult HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}
