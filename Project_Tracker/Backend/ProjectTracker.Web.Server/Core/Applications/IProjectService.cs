using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IProjectService
{
    Task<IEnumerable<ProjectDto>> GetAllAsync();
    Task<ProjectDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(ProjectDto dto);
    Task UpdateAsync(ProjectDto dto);
    Task DeleteAsync(int id);
}
