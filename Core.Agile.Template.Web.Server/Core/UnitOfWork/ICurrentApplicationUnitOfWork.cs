namespace Core.Agile.Template.Web.Server.Core.UnitOfWork;

public interface ICurrentApplicationUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
