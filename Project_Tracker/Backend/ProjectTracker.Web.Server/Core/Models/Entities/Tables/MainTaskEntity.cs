namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class MainTaskEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    public ICollection<SubtaskEntity> Subtasks { get; set; } = new List<SubtaskEntity>();
}
