using ProjectTracker.Web.Server.Persistence.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.Helpers;

public static class DbInitializer
{
    public static async Task SeedAsync(ProjectTrackerDbContext context)
    {
        if (context.Projects.Any()) return;

        var project = new ProjectEntity { Name = "System Core Development" };
        context.Projects.Add(project);
        await context.SaveChangesAsync();

        var categories = new List<CategoryEntity>
        {
            new() { Name = "Frontend Development", ProjectId = project.Id },
            new() { Name = "Backend Architecture", ProjectId = project.Id },
            new() { Name = "Quality Assurance", ProjectId = project.Id }
        };
        context.Categories.AddRange(categories);

        var mainTasks = new List<MainTaskEntity>
        {
            new() { Name = "UI Component Library" },
            new() { Name = "API Integration" },
            new() { Name = "Database Migration" }
        };
        context.MainTasks.AddRange(mainTasks);
        
        await context.SaveChangesAsync();
    }
}
