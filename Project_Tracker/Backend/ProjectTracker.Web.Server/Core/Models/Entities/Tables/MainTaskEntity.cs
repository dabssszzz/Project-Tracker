using ProjectTracker.Web.Server.Core.Models.Entities;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class MainTaskEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public ICollection<ProjectTaskEntity> Tasks { get; set; } = new List<ProjectTaskEntity>();
}
