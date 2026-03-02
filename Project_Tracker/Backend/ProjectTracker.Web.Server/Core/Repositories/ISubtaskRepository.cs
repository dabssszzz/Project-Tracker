using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface ISubtaskRepository : IRepository<SubtaskEntity>
{
    Task<IEnumerable<SubtaskEntity>> GetAllWithHierarchyAsync();
    Task<IEnumerable<SubtaskEntity>> GetByMainTaskIdAsync(int mainTaskId);
}
