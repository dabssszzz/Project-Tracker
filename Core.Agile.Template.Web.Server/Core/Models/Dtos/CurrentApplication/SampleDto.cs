using System.ComponentModel.DataAnnotations;
using Core.Agile.Template.Web.Server.Core.Models.Dtos;

namespace Core.Agile.Template.Web.Server.Core.Models.Dtos.CurrentApplication;

public class SampleDto : BaseDto
{
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public bool IsActive { get; set; }
}
