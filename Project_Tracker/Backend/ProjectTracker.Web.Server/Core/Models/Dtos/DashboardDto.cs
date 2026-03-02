using System.Collections.Generic;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class DashboardDto
{
    public int TotalTasks { get; set; }
    public int InProgressTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int ForReviewTasks { get; set; }
    public List<StatusCountDto> TasksByStatus { get; set; } = new();
    public List<ProjectProgressDto> ProjectProgress { get; set; } = new();
    public List<AssigneeCountDto> TasksByAssignee { get; set; } = new();
}

public class StatusCountDto
{
    public string Status { get; set; } = string.Empty;
    public int Count { get; set; }
}

public class ProjectProgressDto
{
    public string ProjectName { get; set; } = string.Empty;
    public int CompletionPercentage { get; set; }
}

public class AssigneeCountDto
{
    public string Assignee { get; set; } = string.Empty;
    public int Count { get; set; }
}
