namespace Core.Agile.Template.Web.Server.Core.DbContext;

public interface ISuperApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
