using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IReportService
{
    Task<IEnumerable<ReportDto>> GetAllAsync();
    Task<ReportDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(ReportDto dto);
    Task UpdateAsync(ReportDto dto);
    Task DeleteAsync(int id);
}
