using ProjectTracker.Web.Server.Core.Models.Entities;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class ProjectTaskEntity : BaseEntity
{
    public string TaskCode { get; set; } = string.Empty;   // e.g. "ID-20260223-00001"

    public int ProjectId { get; set; }
    public ProjectEntity Project { get; set; } = null!;

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    public int MainTaskId { get; set; }
    public MainTaskEntity MainTask { get; set; } = null!;

    public string? Subtask { get; set; }
    public string? SubtaskCategories { get; set; }
    public string? Details { get; set; }
    public string Status { get; set; } = "In Progress";    // Done/Published | In Progress | For Review | Cancelled
    public string? Assignee { get; set; }
    public DateTime? CompletedDate { get; set; }
}
