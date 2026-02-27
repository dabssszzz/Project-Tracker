using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface ISubtaskCategoryService
{
    Task<IEnumerable<SubtaskCategoryDto>> GetAllAsync();
    Task<SubtaskCategoryDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(SubtaskCategoryDto dto);
    Task UpdateAsync(SubtaskCategoryDto dto);
    Task DeleteAsync(int id);
}
