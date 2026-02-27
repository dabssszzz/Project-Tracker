using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Core.Applications;

public interface IAssigneeService
{
    Task<IEnumerable<AssigneeDto>> GetAllAsync();
    Task<AssigneeDto?> GetByIdAsync(int id);
    Task<int> CreateAsync(AssigneeDto dto);
    Task UpdateAsync(AssigneeDto dto);
    Task DeleteAsync(int id);
}
