namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class SubtaskDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public int MainTaskId { get; set; }
    public int? AssigneeId { get; set; }
}
