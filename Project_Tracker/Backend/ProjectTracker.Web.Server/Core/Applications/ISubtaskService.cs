using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface ISubtaskService
{
    Task<IEnumerable<SubtaskDto>> GetAllAsync();
    Task<SubtaskDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(SubtaskDto dto);
    Task UpdateAsync(SubtaskDto dto);
    Task DeleteAsync(int id);
}
