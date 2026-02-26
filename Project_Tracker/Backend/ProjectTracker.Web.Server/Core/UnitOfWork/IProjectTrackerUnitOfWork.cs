namespace ProjectTracker.Web.Server.Core.UnitOfWork;

public interface IProjectTrackerUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
