using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class ProjectRepository : Repository<ProjectEntity>, IProjectRepository
{
    public ProjectRepository(IProjectTrackerDbContext context) : base(context) { }

    public async Task<ProjectEntity?> GetByNameAsync(string name)
        => await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
}
