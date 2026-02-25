# Setup Guide

## Prerequisites

- .NET 9 SDK
- SQL Server (local or remote)
- Visual Studio 2022 or VS Code
- Node.js (for SPA development)

## Initial Setup

### 1. Configure Database Connection

Update the connection strings in `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_CONNECTION_STRING",
    "SuperApplicationConnection": "YOUR_SUPER_APP_CONNECTION_STRING"
  }
}
```

### 2. Configure Azure AD (for Microsoft Graph)

Update Azure AD settings in `appsettings.json`:

```json
{
  "AzureAd": {
    "ClientId": "YOUR_CLIENT_ID",
    "TenantId": "YOUR_TENANT_ID",
    "ClientSecret": "YOUR_CLIENT_SECRET"
  }
}
```

### 3. Run Database Migrations

```bash
# Add initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update
```

### 4. Run the Application

```bash
dotnet run
```

The API will be available at:
- HTTPS: https://localhost:7200
- HTTP: http://localhost:5200
- Swagger: https://localhost:7200/swagger

## Project Architecture

### Layer Structure

```
??? Core/                    # Domain Layer (Interfaces & Models)
?   ??? Applications/        # Service interfaces
?   ??? DbContext/          # DbContext interfaces
?   ??? Helpers/            # Helper interfaces
?   ??? Models/             # Domain models and DTOs
?   ??? Repositories/       # Repository interfaces
?   ??? ServiceLibraries/   # Service library interfaces
?   ??? UnitOfWork/         # Unit of Work interfaces
?
??? Persistence/            # Infrastructure Layer (Implementations)
?   ??? Applications/       # Service implementations
?   ??? DbContext/          # DbContext implementations
?   ??? EntityConfigurations/ # EF Core configurations
?   ??? Helpers/            # Helper implementations
?   ??? Repositories/       # Repository implementations
?   ??? ServiceLibraries/   # Service library implementations
?   ??? UnitOfWork/         # Unit of Work implementations
?
??? Controllers/            # Presentation Layer (API endpoints)
```

### Dependency Flow

- Controllers ? Application Services ? Repositories ? DbContext
- Core layer contains only interfaces and models (no dependencies)
- Persistence layer implements Core interfaces
- Controllers consume Core interfaces

## Adding New Features

### 1. Create Entity

```csharp
// Core/Models/Entities/CurrentApplication/Tables/YourEntity.cs
public class YourEntity : BaseEntity
{
    public string Name { get; set; } = string.Empty;
}
```

### 2. Create Entity Configuration

```csharp
// Persistence/EntityConfigurations/CurrentApplication/Tables/YourEntityConfig.cs
public class YourEntityConfig : IEntityTypeConfiguration<YourEntity>
{
    public void Configure(EntityTypeBuilder<YourEntity> builder)
    {
        builder.ToTable("YourEntity");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
    }
}
```

### 3. Add DbSet to DbContext

```csharp
// Persistence/DbContext/CurrentApplicationDbContext.cs
public DbSet<YourEntity> YourEntities { get; set; }
```

### 4. Create Repository Interface

```csharp
// Core/Repositories/IYourRepository.cs
public interface IYourRepository : IRepository<YourEntity>
{
    Task<YourEntity?> GetByNameAsync(string name);
}
```

### 5. Implement Repository

```csharp
// Persistence/Repositories/YourRepository.cs
public class YourRepository : Repository<YourEntity>, IYourRepository
{
    public YourRepository(ICurrentApplicationDbContext context) : base(context) { }
    
    public async Task<YourEntity?> GetByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
    }
}
```

### 6. Create Service Interface

```csharp
// Core/Applications/IYourService.cs
public interface IYourService
{
    Task<YourDto> GetByIdAsync(int id);
    Task<int> CreateAsync(YourDto dto);
}
```

### 7. Implement Service

```csharp
// Persistence/Applications/YourService.cs
public class YourService : IYourService
{
    private readonly IYourRepository _repository;
    private readonly ICurrentApplicationUnitOfWork _unitOfWork;
    
    public YourService(IYourRepository repository, ICurrentApplicationUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }
    
    // Implement methods
}
```

### 8. Register Services

Add to `Program.cs`:

```csharp
builder.Services.AddScoped<IYourRepository, YourRepository>();
builder.Services.AddScoped<IYourService, YourService>();
```

### 9. Create Controller

```csharp
// Controllers/YourController.cs
[ApiController]
[Route("api/[controller]")]
public class YourController : BaseController
{
    private readonly IYourService _service;
    
    public YourController(IYourService service, ILogger<YourController> logger) 
        : base(logger)
    {
        _service = service;
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var result = await _service.GetByIdAsync(id);
            return Success(result);
        }
        catch (Exception ex)
        {
            return HandleError(ex);
        }
    }
}
```

## Common Tasks

### Add Migration

```bash
dotnet ef migrations add YourMigrationName
```

### Update Database

```bash
dotnet ef database update
```

### Remove Last Migration

```bash
dotnet ef migrations remove
```

### Restore Packages

```bash
dotnet restore
```

### Build Project

```bash
dotnet build
```

### Run Tests

```bash
dotnet test
```

## Best Practices

1. **Keep Core layer clean** - No implementation details in Core layer
2. **Use DTOs** - Don't expose entities directly through API
3. **Follow naming conventions** - Services end with "Service", Repositories with "Repository"
4. **Use async/await** - All I/O operations should be asynchronous
5. **Validate input** - Use data annotations and FluentValidation
6. **Handle exceptions** - Use try-catch in controllers
7. **Log appropriately** - Use ILogger for debugging and error tracking
8. **Use cancellation tokens** - Pass CancellationToken for long-running operations

## Troubleshooting

### Connection Issues

- Verify connection strings in appsettings
- Ensure SQL Server is running
- Check firewall settings

### Authentication Issues

- Verify JWT Authority URL is accessible
- Check ValidAudience matches your identity server configuration
- Ensure bearer token is included in requests

### Build Errors

```bash
# Clean and rebuild
dotnet clean
dotnet build
```

## Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core Documentation](https://docs.microsoft.com/ef/core)
- [Microsoft Graph Documentation](https://docs.microsoft.com/graph)
