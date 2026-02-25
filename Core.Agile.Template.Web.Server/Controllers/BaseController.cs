using Microsoft.AspNetCore.Mvc;

namespace Core.Agile.Template.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected readonly ILogger _logger;

    protected BaseController(ILogger logger)
    {
        _logger = logger;
    }

    protected IActionResult HandleError(Exception ex, string message = "An error occurred")
    {
        _logger.LogError(ex, message);
        return StatusCode(500, new { error = message, details = ex.Message });
    }

    protected IActionResult Success<T>(T data, string? message = null)
    {
        return Ok(new { success = true, data, message });
    }

    protected IActionResult Error(string message, int statusCode = 400)
    {
        return StatusCode(statusCode, new { success = false, error = message });
    }
}
