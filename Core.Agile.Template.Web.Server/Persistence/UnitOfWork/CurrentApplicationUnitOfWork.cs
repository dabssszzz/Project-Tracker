using Core.Agile.Template.Web.Server.Core.DbContext;
using Core.Agile.Template.Web.Server.Core.UnitOfWork;

namespace Core.Agile.Template.Web.Server.Persistence.UnitOfWork;

public class CurrentApplicationUnitOfWork : ICurrentApplicationUnitOfWork
{
    private readonly ICurrentApplicationDbContext _context;

    public CurrentApplicationUnitOfWork(ICurrentApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }
}
