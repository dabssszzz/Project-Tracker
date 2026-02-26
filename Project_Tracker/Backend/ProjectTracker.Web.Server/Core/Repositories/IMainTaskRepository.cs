using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface IMainTaskRepository : IRepository<MainTaskEntity>
{
    Task<MainTaskEntity?> GetByNameAsync(string name);
}
