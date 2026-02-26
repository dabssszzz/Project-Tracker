namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class AnalyticsDashboardDto
{
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int InProgressTasks { get; set; }
    public int ForReviewTasks { get; set; }
    public int CancelledTasks { get; set; }

    // Chart Data
    public List<TaskStatusCountDto> TasksByStatus { get; set; } = new();
    public List<AssigneeTaskCountDto> TasksByAssignee { get; set; } = new();
    public List<ProjectProgressDto> ProjectProgress { get; set; } = new();
}

public class TaskStatusCountDto
{
    public string Status { get; set; } = string.Empty;
    public int Count { get; set; }
}

public class AssigneeTaskCountDto
{
    public string Assignee { get; set; } = string.Empty;
    public int Count { get; set; }
}

public class ProjectProgressDto
{
    public string ProjectName { get; set; } = string.Empty;
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public double CompletionPercentage => TotalTasks == 0 ? 0 : Math.Round((double)CompletedTasks / TotalTasks * 100, 1);
}
