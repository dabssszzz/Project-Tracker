using ProjectTracker.Web.Server.Core.Models.Dtos;
using System.ComponentModel.DataAnnotations;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class ProjectDto : BaseDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
}
