using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Core.Repositories;

public interface ISubtaskCategoryRepository : IRepository<SubtaskCategoryEntity>
{
    Task<IEnumerable<SubtaskCategoryEntity>> GetBySubtaskIdAsync(int subtaskId);
}
