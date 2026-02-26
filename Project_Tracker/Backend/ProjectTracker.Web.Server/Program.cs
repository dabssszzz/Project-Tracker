using Microsoft.EntityFrameworkCore;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;
using ProjectTracker.Web.Server.Persistence.Applications;
using ProjectTracker.Web.Server.Persistence.DbContext;
using ProjectTracker.Web.Server.Persistence.Repositories;
using ProjectTracker.Web.Server.Persistence.UnitOfWork;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ── Database ────────────────────────────────────────────────
builder.Services.AddDbContext<ProjectTrackerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProjectTrackerDbContext, ProjectTrackerDbContext>();

// ── Repositories ────────────────────────────────────────────
builder.Services.AddScoped<IProjectRepository,     ProjectRepository>();
builder.Services.AddScoped<ICategoryRepository,    CategoryRepository>();
builder.Services.AddScoped<IMainTaskRepository,    MainTaskRepository>();
builder.Services.AddScoped<IProjectTaskRepository, ProjectTaskRepository>();

// ── Services ────────────────────────────────────────────────
builder.Services.AddScoped<IProjectService,     ProjectService>();
builder.Services.AddScoped<ICategoryService,    CategoryService>();
builder.Services.AddScoped<IMainTaskService,    MainTaskService>();
builder.Services.AddScoped<IProjectTaskService, ProjectTaskService>();

// ── Unit of Work ────────────────────────────────────────────
builder.Services.AddScoped<IProjectTrackerUnitOfWork, ProjectTrackerUnitOfWork>();

// ── JSON ────────────────────────────────────────────────────
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// ── CORS ────────────────────────────────────────────────────
const string CorsPolicy = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy => policy
        .SetIsOriginAllowed(origin => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

// ── Swagger ──────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ── Seed Data ────────────────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ProjectTrackerDbContext>();
    await context.Database.MigrateAsync();
    await ProjectTracker.Web.Server.Persistence.Helpers.DbInitializer.SeedAsync(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); // Removed to allow local HTTP requests without SSL errors
app.UseCors(CorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();
