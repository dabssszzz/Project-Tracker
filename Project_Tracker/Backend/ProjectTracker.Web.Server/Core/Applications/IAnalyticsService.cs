using System.Threading.Tasks;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IAnalyticsService
{
    Task<DashboardDto> GetDashboardDataAsync();
}
