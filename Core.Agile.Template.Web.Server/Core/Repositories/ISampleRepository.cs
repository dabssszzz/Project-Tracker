using Core.Agile.Template.Web.Server.Core.Models.Entities.CurrentApplication.Tables;

namespace Core.Agile.Template.Web.Server.Core.Repositories;

public interface ISampleRepository : IRepository<SampleEntity>
{
    Task<IEnumerable<SampleEntity>> GetActiveItemsAsync();
    Task<SampleEntity?> GetByNameAsync(string name);
}
