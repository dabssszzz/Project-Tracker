using Microsoft.AspNetCore.Mvc;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected readonly ILogger _logger;

    protected BaseController(ILogger logger)
    {
        _logger = logger;
    }

    protected IActionResult Success<T>(T data, string? message = null)
        => Ok(new { success = true, data, message });

    protected IActionResult HandleError(Exception ex, string message = "An error occurred")
    {
        _logger.LogError(ex, message);
        return StatusCode(500, new { success = false, error = message, details = ex.Message });
    }

    protected IActionResult NotFoundError(string message)
        => NotFound(new { success = false, error = message });
}
