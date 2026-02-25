using Core.Agile.Template.Web.Server.Core.Models.Dtos.CurrentApplication;

namespace Core.Agile.Template.Web.Server.Core.Applications;

public interface ISampleService
{
    Task<SampleDto?> GetByIdAsync(int id);
    Task<IEnumerable<SampleDto>> GetAllAsync();
    Task<IEnumerable<SampleDto>> GetActiveItemsAsync();
    Task<int> CreateAsync(SampleDto dto);
    Task UpdateAsync(SampleDto dto);
    Task DeleteAsync(int id);
}
