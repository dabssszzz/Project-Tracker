using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IStatusService
{
    Task<IEnumerable<StatusDto>> GetAllAsync();
    Task<StatusDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(StatusDto dto);
    Task UpdateAsync(StatusDto dto);
    Task DeleteAsync(int id);
}
