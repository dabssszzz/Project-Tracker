using System;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class ReportDto : BaseDto
{
    public int ProjectId { get; set; }
    public string? ProjectName { get; set; }

    public int CategoryId { get; set; }
    public string? CategoryName { get; set; }

    public int MaintaskId { get; set; }
    public string? MaintaskName { get; set; }

    public int SubtaskId { get; set; }
    public string? SubtaskName { get; set; }

    public int Subtask_CategoryId { get; set; }
    public string? Subtask_CategoryName { get; set; }

    public int AssigneeId { get; set; }
    public string? AssigneeName { get; set; }

    public string Details { get; set; } = string.Empty;

    public int StatusId { get; set; }
    public string? StatusName { get; set; }

    public DateTime Date_Start { get; set; }
    public DateTime? Date_Completed { get; set; }
    public DateTime Date_Create { get; set; }
    public DateTime? Date_Update { get; set; }
    public bool Is_Deleted { get; set; }
}
