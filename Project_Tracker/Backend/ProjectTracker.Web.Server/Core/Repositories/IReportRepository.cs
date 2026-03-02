using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface IReportRepository : IRepository<ReportEntity>
{
    Task<IEnumerable<ReportEntity>> GetAllWithDetailsAsync();
}
