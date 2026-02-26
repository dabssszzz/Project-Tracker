using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class CategoryRepository : Repository<CategoryEntity>, ICategoryRepository
{
    public CategoryRepository(IProjectTrackerDbContext context) : base(context) { }

    public async Task<IEnumerable<CategoryEntity>> GetByProjectIdAsync(int projectId)
        => await _dbSet.Where(x => x.ProjectId == projectId).ToListAsync();
}
