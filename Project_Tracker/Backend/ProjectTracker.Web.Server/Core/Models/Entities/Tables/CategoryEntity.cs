namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class CategoryEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int ProjectId { get; set; }
    public ProjectEntity Project { get; set; } = null!;

    public ICollection<MainTaskEntity> MainTasks { get; set; } = new List<MainTaskEntity>();
}
