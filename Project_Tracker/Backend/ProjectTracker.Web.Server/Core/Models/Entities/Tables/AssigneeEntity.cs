namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class AssigneeEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public ICollection<SubtaskEntity> Subtasks { get; set; } = new List<SubtaskEntity>();
}
