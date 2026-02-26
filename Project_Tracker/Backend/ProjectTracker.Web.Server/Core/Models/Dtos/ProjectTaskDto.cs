using System.ComponentModel.DataAnnotations;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class ProjectTaskDto : BaseDto
{
    public string TaskCode { get; set; } = string.Empty;

    [Required]
    public int ProjectId { get; set; }
    public string? ProjectName { get; set; }

    [Required]
    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }

    [Required]
    public int MainTaskId { get; set; }
    public string? MainTaskName { get; set; }

    public string? Subtask { get; set; }
    public string? SubtaskCategories { get; set; }
    public string? Details { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "In Progress";

    [MaxLength(200)]
    public string? Assignee { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public bool IsActive { get; set; } = true;
}

public class ProjectTaskFilterDto
{
    public string? Assignee { get; set; }
    public string? Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
