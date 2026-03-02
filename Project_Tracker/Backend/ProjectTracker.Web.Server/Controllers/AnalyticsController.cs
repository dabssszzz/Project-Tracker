using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController(IAnalyticsService service, ILogger<AnalyticsController> logger)
    : BaseController(logger)
{
    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        try
        {
            var data = await service.GetDashboardDataAsync();
            return Success(data);
        }
        catch (Exception ex)
        {
            return HandleError(ex, "Failed to get analytics dashboard data");
        }
    }
}
