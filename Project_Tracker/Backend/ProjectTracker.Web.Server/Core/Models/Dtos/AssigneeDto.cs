namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class AssigneeDto : BaseDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
