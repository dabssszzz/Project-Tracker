using Core.Agile.Template.Web.Server.Core.DbContext;
using Core.Agile.Template.Web.Server.Core.Models.Entities.CurrentApplication.Tables;
using Microsoft.EntityFrameworkCore;

namespace Core.Agile.Template.Web.Server.Persistence.DbContext;

public class CurrentApplicationDbContext(DbContextOptions<CurrentApplicationDbContext> options) : Microsoft.EntityFrameworkCore.DbContext(options), ICurrentApplicationDbContext
{
    public DbSet<SampleEntity> SampleEntities { get; set; }
    public DbContextOptions<CurrentApplicationDbContext> Options { get; }

    public new async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(CurrentApplicationDbContext).Assembly);
    }
}
