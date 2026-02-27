using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
    Task<CategoryDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(CategoryDto dto);
    Task UpdateAsync(CategoryDto dto);
    Task DeleteAsync(int id);
}
