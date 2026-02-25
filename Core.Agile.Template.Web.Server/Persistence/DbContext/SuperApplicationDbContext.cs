using Core.Agile.Template.Web.Server.Core.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Core.Agile.Template.Web.Server.Persistence.DbContext;

public class SuperApplicationDbContext(DbContextOptions<SuperApplicationDbContext> options)
		: Microsoft.EntityFrameworkCore.DbContext(options), ISuperApplicationDbContext

{

	protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Apply entity configurations here
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(SuperApplicationDbContext).Assembly);
    }
}
