using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface IProjectRepository : IRepository<ProjectEntity>
{
    Task<ProjectEntity?> GetByNameAsync(string name);
}
