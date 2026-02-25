using Core.Agile.Template.Web.Server.Core.Applications;
using Core.Agile.Template.Web.Server.Core.DbContext;
using Core.Agile.Template.Web.Server.Core.Helpers;
using Core.Agile.Template.Web.Server.Core.Repositories;
using Core.Agile.Template.Web.Server.Core.ServiceLibraries;
using Core.Agile.Template.Web.Server.Core.UnitOfWork;
using Core.Agile.Template.Web.Server.Persistence.Applications;
using Core.Agile.Template.Web.Server.Persistence.DbContext;
using Core.Agile.Template.Web.Server.Persistence.Helpers;
using Core.Agile.Template.Web.Server.Persistence.Repositories;
using Core.Agile.Template.Web.Server.Persistence.ServiceLibraries;
using Core.Agile.Template.Web.Server.Persistence.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var fileRootFolder = builder.Environment.IsDevelopment() 
    ? builder.Environment.ContentRootPath 
    : builder.Configuration.GetSection("BaseFileLocation").Value;

#region Database Configuration
builder.Services.AddDbContext<SuperApplicationDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("SuperApplicationConnection")));
builder.Services.AddScoped<ISuperApplicationDbContext, SuperApplicationDbContext>();

builder.Services.AddDbContext<CurrentApplicationDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .EnableSensitiveDataLogging());
builder.Services.AddScoped<ICurrentApplicationDbContext, CurrentApplicationDbContext>();
#endregion

#region Repositories Registration
builder.Services.AddScoped<ISampleRepository, SampleRepository>();
#endregion

#region Services Registration
builder.Services.AddScoped<IUserAuthenticationService, UserAuthenticationService>();
builder.Services.AddScoped<IGlobalServices, GlobalServices>();
builder.Services.AddScoped<ISampleService, SampleService>();
#endregion

#region Unit of Work
builder.Services.AddScoped<ICurrentApplicationUnitOfWork, CurrentApplicationUnitOfWork>();
#endregion

#region Service Libraries
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IFileService, FileService>();
#endregion

#region Helpers
builder.Services.AddScoped<ISendEmailHelper, SendEmailHelper>();
#endregion

#region Graph Service Registration
builder.Services.AddScoped<IGraphService>(_ =>
{
    var azureAdConfig = builder.Configuration.GetSection("AzureAd");
    var tenantId = azureAdConfig["TenantId"]
        ?? throw new InvalidOperationException("AzureAd:TenantId is missing in configuration.");
    var clientId = azureAdConfig["ClientId"]
        ?? throw new InvalidOperationException("AzureAd:ClientId is missing in configuration.");
    var clientSecret = azureAdConfig["ClientSecret"]
        ?? throw new InvalidOperationException("AzureAd:ClientSecret is missing in configuration.");

    return new GraphService(tenantId, clientId, clientSecret);
});
#endregion

#region JSON Configuration
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
#endregion

#region Authentication
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://system.onecoredevit.com/cas/services/identity_server";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidAudience = "CoreAgileSystem"
        };
        options.RequireHttpsMetadata = true;
    });

builder.Services.AddAuthorization();
#endregion

#region CORS Configuration
const string CorsPolicy = "AllowLocalDev";

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "https://localhost:5173"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});
#endregion

#region Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endregion

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();
app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(CorsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
