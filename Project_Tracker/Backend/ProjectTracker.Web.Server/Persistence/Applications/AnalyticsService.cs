using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class AnalyticsService(IReportRepository reportRepo, IProjectRepository projectRepo) : IAnalyticsService
{
    public async Task<DashboardDto> GetDashboardDataAsync()
    {
        var reports = (await reportRepo.GetAllWithDetailsAsync()).ToList();
        var projects = (await projectRepo.GetAllAsync()).ToList();

        var dto = new DashboardDto
        {
            TotalTasks = reports.Count,
            InProgressTasks = reports.Count(r => r.Status?.Name == "In Progress"),
            CompletedTasks = reports.Count(r => r.Status?.Name == "Done"),
            ForReviewTasks = reports.Count(r => r.Status?.Name == "Review"),

            TasksByStatus = reports
                .GroupBy(r => r.Status?.Name ?? "Unknown")
                .Select(g => new StatusCountDto { Status = g.Key, Count = g.Count() })
                .ToList(),

            TasksByAssignee = reports
                .GroupBy(r => r.Assignee?.Name ?? "Unassigned")
                .Select(g => new AssigneeCountDto { Assignee = g.Key, Count = g.Count() })
                .ToList(),

            ProjectProgress = projects.Select(p =>
            {
                var projectReports = reports.Where(r => r.ProjectId == p.Id).ToList();
                var total = projectReports.Count;
                var completed = projectReports.Count(r => r.Status?.Name == "Done");
                return new ProjectProgressDto
                {
                    ProjectName = p.Name,
                    CompletionPercentage = total > 0 ? (int)((double)completed / total * 100) : 0
                };
            }).ToList()
        };

        return dto;
    }
}
