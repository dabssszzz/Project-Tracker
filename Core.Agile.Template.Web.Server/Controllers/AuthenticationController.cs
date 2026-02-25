using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Agile.Template.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(ILogger<AuthenticationController> logger)
    {
        _logger = logger;
    }

    [HttpGet("status")]
    [Authorize]
    public IActionResult GetStatus()
    {
        return Ok(new { authenticated = true, user = User.Identity?.Name });
    }
}
