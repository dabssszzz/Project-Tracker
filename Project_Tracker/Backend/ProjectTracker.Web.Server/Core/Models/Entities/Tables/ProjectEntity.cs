using ProjectTracker.Web.Server.Core.Models.Entities;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class ProjectEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public ICollection<CategoryEntity> Categories { get; set; } = new List<CategoryEntity>();
    public ICollection<ProjectTaskEntity> Tasks { get; set; } = new List<ProjectTaskEntity>();
}
