using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class ProjectTaskRepository : Repository<ProjectTaskEntity>, IProjectTaskRepository
{
    public ProjectTaskRepository(IProjectTrackerDbContext context) : base(context) { }

    public async Task<IEnumerable<ProjectTaskEntity>> GetAllWithDetailsAsync()
        => await _dbSet
            .Include(t => t.Project)
            .Include(t => t.Category)
            .Include(t => t.MainTask)
            .Where(t => t.IsActive)
            .OrderByDescending(t => t.CreatedDate)
            .ToListAsync();

    public async Task<IEnumerable<ProjectTaskEntity>> GetFilteredAsync(ProjectTaskFilterDto filter)
    {
        var query = _dbSet
            .Include(t => t.Project)
            .Include(t => t.Category)
            .Include(t => t.MainTask)
            .Where(t => t.IsActive)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(filter.Assignee))
            query = query.Where(t => t.Assignee != null && t.Assignee.Contains(filter.Assignee));

        if (!string.IsNullOrWhiteSpace(filter.Status))
            query = query.Where(t => t.Status == filter.Status);

        if (filter.StartDate.HasValue)
            query = query.Where(t => t.CreatedDate >= filter.StartDate.Value);

        if (filter.EndDate.HasValue)
            query = query.Where(t => t.CreatedDate <= filter.EndDate.Value.AddDays(1));

        return await query.OrderByDescending(t => t.CreatedDate).ToListAsync();
    }

    public async Task<string> GenerateTaskCodeAsync()
    {
        var today = DateTime.UtcNow;
        var prefix = $"ID-{today:yyyyMMdd}";
        var existingCodes = await _dbSet
            .Where(t => t.TaskCode.StartsWith(prefix))
            .Select(t => t.TaskCode)
            .ToListAsync();

        var maxSeq = existingCodes
            .Select(c => { var parts = c.Split('-'); return parts.Length == 3 && int.TryParse(parts[2], out int s) ? s : 0; })
            .DefaultIfEmpty(0)
            .Max();

        return $"{prefix}-{(maxSeq + 1):D5}";
    }
}
