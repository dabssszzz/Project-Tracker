namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class CategoryDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public int ProjectId { get; set; }
}
