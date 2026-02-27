namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class SubtaskDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public string? TaskCode { get; set; }
    public string? Details { get; set; }
    public string Status { get; set; } = "In Progress";
    
    public int MainTaskId { get; set; }
    public string? MainTaskName { get; set; }
    public string? CategoryName { get; set; }
    public string? ProjectName { get; set; }
    
    public int? AssigneeId { get; set; }
    public string? AssigneeName { get; set; }
    
    public string? SubtaskCategoryNames { get; set; }
}

