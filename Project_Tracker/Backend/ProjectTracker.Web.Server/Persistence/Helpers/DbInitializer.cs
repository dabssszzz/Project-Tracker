using ProjectTracker.Web.Server.Persistence.DbContext;

namespace ProjectTracker.Web.Server.Persistence.Helpers;

public static class DbInitializer
{
    public static Task SeedAsync(ProjectTrackerDbContext context) => Task.CompletedTask;
}
