using Core.Agile.Template.Web.Server.Core.DbContext;
using Core.Agile.Template.Web.Server.Core.Models.Entities.CurrentApplication.Tables;
using Core.Agile.Template.Web.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Core.Agile.Template.Web.Server.Persistence.Repositories;

public class SampleRepository : Repository<SampleEntity>, ISampleRepository
{
    public SampleRepository(ICurrentApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<SampleEntity>> GetActiveItemsAsync()
    {
        return await _dbSet.Where(x => x.IsActive).ToListAsync();
    }

    public async Task<SampleEntity?> GetByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
    }
}
