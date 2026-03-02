using System.Collections.Generic;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class ProjectEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public ICollection<CategoryEntity> Categories { get; set; } = new List<CategoryEntity>();
}
