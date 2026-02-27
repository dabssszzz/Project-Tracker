using Microsoft.EntityFrameworkCore;
using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class SubtaskRepository(IProjectTrackerDbContext context)
    : Repository<SubtaskEntity>(context), ISubtaskRepository
{
    public async Task<IEnumerable<SubtaskEntity>> GetAllWithHierarchyAsync()
    {
        return await _dbSet
            .Include(s => s.Assignee)
            .Include(s => s.SubtaskCategories)
            .Include(s => s.MainTask)
                .ThenInclude(m => m.Category)
                    .ThenInclude(c => c.Project)
            .ToListAsync();
    }
}

