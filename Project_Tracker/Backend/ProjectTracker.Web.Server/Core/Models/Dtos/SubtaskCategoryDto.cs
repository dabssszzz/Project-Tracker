namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class SubtaskCategoryDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public int SubtaskId { get; set; }
}
