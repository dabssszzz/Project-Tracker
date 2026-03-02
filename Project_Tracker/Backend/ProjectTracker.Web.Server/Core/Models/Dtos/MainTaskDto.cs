namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class MainTaskDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public int CategoryId { get; set; }
}
