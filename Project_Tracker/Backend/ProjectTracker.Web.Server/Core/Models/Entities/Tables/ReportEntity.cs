using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class ReportEntity : BaseEntity
{
    public int ProjectId { get; set; }
    public ProjectEntity Project { get; set; } = null!;

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    public int MaintaskId { get; set; }
    public MainTaskEntity Maintask { get; set; } = null!;

    public int SubtaskId { get; set; }
    public SubtaskEntity Subtask { get; set; } = null!;

    public int Subtask_CategoryId { get; set; }
    public SubtaskCategoryEntity Subtask_Category { get; set; } = null!;

    public int AssigneeId { get; set; }
    public AssigneeEntity Assignee { get; set; } = null!;

    public string Details { get; set; } = string.Empty;

    public int StatusId { get; set; }
    public StatusEntity Status { get; set; } = null!;

    public DateTime Date_Start { get; set; }
    public DateTime? Date_Completed { get; set; }
    public DateTime Date_Create { get; set; } = DateTime.UtcNow;
    public DateTime? Date_Update { get; set; }
    public bool Is_Deleted { get; set; } = false;
}
