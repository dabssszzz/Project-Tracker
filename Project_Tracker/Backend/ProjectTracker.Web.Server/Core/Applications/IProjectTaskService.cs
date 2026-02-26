using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IProjectTaskService
{
    Task<IEnumerable<ProjectTaskDto>> GetAllAsync();
    Task<IEnumerable<ProjectTaskDto>> GetFilteredAsync(ProjectTaskFilterDto filter);
    Task<ProjectTaskDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(ProjectTaskDto dto);
    Task UpdateAsync(ProjectTaskDto dto);
    Task DeleteAsync(int id);
}
