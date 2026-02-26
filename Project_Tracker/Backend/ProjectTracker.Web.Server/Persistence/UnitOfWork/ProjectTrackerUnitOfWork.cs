using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.UnitOfWork;

public class ProjectTrackerUnitOfWork : IProjectTrackerUnitOfWork
{
    private readonly IProjectTrackerDbContext _context;

    public ProjectTrackerUnitOfWork(IProjectTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => await _context.SaveChangesAsync(cancellationToken);
}
