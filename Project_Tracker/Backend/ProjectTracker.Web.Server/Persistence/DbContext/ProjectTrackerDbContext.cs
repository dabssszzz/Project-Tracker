using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Persistence.DbContext;

public class ProjectTrackerDbContext(DbContextOptions<ProjectTrackerDbContext> options)
    : Microsoft.EntityFrameworkCore.DbContext(options), IProjectTrackerDbContext
{
    public DbSet<ProjectEntity> Projects { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }
    public DbSet<MainTaskEntity> MainTasks { get; set; }
    public DbSet<ProjectTaskEntity> ProjectTasks { get; set; }

    public new async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => await base.SaveChangesAsync(cancellationToken);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProjectTrackerDbContext).Assembly);
    }
}
