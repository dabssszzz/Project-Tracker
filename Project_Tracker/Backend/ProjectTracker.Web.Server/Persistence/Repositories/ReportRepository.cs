using Microsoft.EntityFrameworkCore;
using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class ReportRepository(IProjectTrackerDbContext context)
    : Repository<ReportEntity>(context), IReportRepository
{
    public async Task<IEnumerable<ReportEntity>> GetAllWithDetailsAsync()
    {
        return await _dbSet
            .Include(r => r.Project)
            .Include(r => r.Category)
            .Include(r => r.Maintask)
            .Include(r => r.Subtask)
            .Include(r => r.Subtask_Category)
            .Include(r => r.Assignee)
            .Include(r => r.Status)
            .ToListAsync();
    }
}
