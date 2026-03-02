using System.Collections.Generic;

namespace ProjectTracker.Web.Server.Core.Models.Entities.Tables;

public class SubtaskEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public int MainTaskId { get; set; }
    public MainTaskEntity MainTask { get; set; } = null!;

    public ICollection<SubtaskCategoryEntity> SubtaskCategories { get; set; } = new List<SubtaskCategoryEntity>();
}
