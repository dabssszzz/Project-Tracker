using Core.Agile.Template.Web.Server.Core.Models.Entities;

namespace Core.Agile.Template.Web.Server.Core.Models.Entities.CurrentApplication.Tables;

public class SampleEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
