using System.ComponentModel.DataAnnotations;

namespace ProjectTracker.Web.Server.Core.Models.Dtos;

public class MainTaskDto : BaseDto
{
    [Required]
    [MaxLength(300)]
    public string Name { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; }
}
