namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class SubtaskCategoryEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int SubtaskId { get; set; }
    public SubtaskEntity Subtask { get; set; } = null!;
}
