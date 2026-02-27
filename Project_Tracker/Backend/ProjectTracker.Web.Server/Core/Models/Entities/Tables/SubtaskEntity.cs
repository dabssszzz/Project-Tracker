namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class SubtaskEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int MainTaskId { get; set; }
    public MainTaskEntity MainTask { get; set; } = null!;

    public int? AssigneeId { get; set; }
    public AssigneeEntity? Assignee { get; set; }

    public ICollection<SubtaskCategoryEntity> SubtaskCategories { get; set; } = new List<SubtaskCategoryEntity>();
}
