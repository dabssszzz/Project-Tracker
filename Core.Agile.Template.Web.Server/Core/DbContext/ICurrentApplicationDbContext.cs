namespace Core.Agile.Template.Web.Server.Core.DbContext;

public interface ICurrentApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
