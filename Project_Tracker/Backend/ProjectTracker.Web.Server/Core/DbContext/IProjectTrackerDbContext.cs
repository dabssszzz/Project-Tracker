using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Core.DbContext;

public interface IProjectTrackerDbContext
{
    DbSet<ProjectEntity> Projects { get; set; }
    DbSet<CategoryEntity> Categories { get; set; }
    DbSet<MainTaskEntity> MainTasks { get; set; }
    DbSet<ProjectTaskEntity> ProjectTasks { get; set; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
