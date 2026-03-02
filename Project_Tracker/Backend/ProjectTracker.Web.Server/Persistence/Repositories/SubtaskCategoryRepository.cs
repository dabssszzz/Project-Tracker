using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class SubtaskCategoryRepository(IProjectTrackerDbContext context)
    : Repository<SubtaskCategoryEntity>(context), ISubtaskCategoryRepository
{
    public async Task<IEnumerable<SubtaskCategoryEntity>> GetBySubtaskIdAsync(int subtaskId)
    {
        return await _dbSet.Where(x => x.SubtaskId == subtaskId).ToListAsync();
    }
}
