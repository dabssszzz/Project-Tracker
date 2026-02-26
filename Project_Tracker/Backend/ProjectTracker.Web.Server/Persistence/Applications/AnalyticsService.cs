using Microsoft.EntityFrameworkCore;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Persistence.DbContext;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class AnalyticsService : IAnalyticsService
{
    private readonly ProjectTrackerDbContext _context;

    public AnalyticsService(ProjectTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<AnalyticsDashboardDto> GetDashboardMetricsAsync()
    {
        var tasks = await _context.ProjectTasks
            .Include(t => t.Project)
            .Where(t => t.IsActive)
            .ToListAsync();

        var dto = new AnalyticsDashboardDto
        {
            TotalTasks = tasks.Count,
            CompletedTasks = tasks.Count(t => t.Status == "Done/Published"),
            InProgressTasks = tasks.Count(t => t.Status == "In Progress"),
            ForReviewTasks = tasks.Count(t => t.Status == "For Review"),
            CancelledTasks = tasks.Count(t => t.Status == "Cancelled"),
            
            TasksByStatus = tasks
                .GroupBy(t => t.Status)
                .Select(g => new TaskStatusCountDto { Status = g.Key ?? "Unknown", Count = g.Count() })
                .ToList(),

            TasksByAssignee = tasks
                .Where(t => !string.IsNullOrEmpty(t.Assignee))
                .GroupBy(t => t.Assignee)
                .Select(g => new AssigneeTaskCountDto { Assignee = g.Key!, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .Take(5)
                .ToList(),
                
            ProjectProgress = tasks
                .Where(t => t.Project != null)
                .GroupBy(t => t.Project)
                .Select(g => new ProjectProgressDto
                {
                    ProjectName = g.Key!.Name,
                    TotalTasks = g.Count(),
                    CompletedTasks = g.Count(t => t.Status == "Done/Published")
                })
                .ToList()
        };

        return dto;
    }
}
