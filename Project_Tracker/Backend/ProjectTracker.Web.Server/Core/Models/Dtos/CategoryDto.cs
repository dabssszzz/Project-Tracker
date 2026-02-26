using System.ComponentModel.DataAnnotations;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class CategoryDto : BaseDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public int ProjectId { get; set; }
    public string? ProjectName { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
}
