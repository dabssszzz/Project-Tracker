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

// ── Database ─────────────────────────────────────────────────
builder.Services.AddDbContext<ProjectTrackerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProjectTrackerDbContext, ProjectTrackerDbContext>();

// ── Repositories ─────────────────────────────────────────────
builder.Services.AddScoped<IProjectRepository,         ProjectRepository>();
builder.Services.AddScoped<ICategoryRepository,        CategoryRepository>();
builder.Services.AddScoped<IMainTaskRepository,        MainTaskRepository>();
builder.Services.AddScoped<ISubtaskRepository,         SubtaskRepository>();
builder.Services.AddScoped<ISubtaskCategoryRepository, SubtaskCategoryRepository>();
builder.Services.AddScoped<IAssigneeRepository,        AssigneeRepository>();
builder.Services.AddScoped<IStatusRepository,          StatusRepository>();
builder.Services.AddScoped<IReportRepository,          ReportRepository>();

// ── Services ──────────────────────────────────────────────────
builder.Services.AddScoped<IProjectService,         ProjectService>();
builder.Services.AddScoped<ICategoryService,        CategoryService>();
builder.Services.AddScoped<IMainTaskService,        MainTaskService>();
builder.Services.AddScoped<ISubtaskService,         SubtaskService>();
builder.Services.AddScoped<ISubtaskCategoryService, SubtaskCategoryService>();
builder.Services.AddScoped<IAssigneeService,        AssigneeService>();
builder.Services.AddScoped<IStatusService,          StatusService>();
builder.Services.AddScoped<IReportService,          ReportService>();
builder.Services.AddScoped<IAnalyticsService,       AnalyticsService>();

// ── Unit of Work ─────────────────────────────────────────────
builder.Services.AddScoped<IProjectTrackerUnitOfWork, ProjectTrackerUnitOfWork>();

// ── JSON ──────────────────────────────────────────────────────
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// ── CORS ──────────────────────────────────────────────────────
const string CorsPolicy = "AllowFrontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy => policy
        .SetIsOriginAllowed(origin => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

// ── Swagger ───────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ── Migrate DB ────────────────────────────────────────────────
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

app.UseCors(CorsPolicy);
app.UseAuthorization();
app.MapControllers();

app.Run();
