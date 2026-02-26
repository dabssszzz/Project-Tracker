using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IMainTaskService
{
    Task<IEnumerable<MainTaskDto>> GetAllAsync();
    Task<MainTaskDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(MainTaskDto dto);
    Task UpdateAsync(MainTaskDto dto);
    Task DeleteAsync(int id);
}
