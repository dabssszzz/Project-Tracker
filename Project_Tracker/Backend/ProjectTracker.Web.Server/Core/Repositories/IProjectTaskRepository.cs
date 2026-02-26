using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface IProjectTaskRepository : IRepository<ProjectTaskEntity>
{
    Task<IEnumerable<ProjectTaskEntity>> GetFilteredAsync(ProjectTaskFilterDto filter);
    Task<IEnumerable<ProjectTaskEntity>> GetAllWithDetailsAsync();
    Task<string> GenerateTaskCodeAsync();
}
