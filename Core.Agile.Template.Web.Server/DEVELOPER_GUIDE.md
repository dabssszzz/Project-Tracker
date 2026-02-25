# Core.Agile Template Web Server - Developer Guide

## Quick Start Checklist

- [ ] Update database connection strings in `appsettings.Development.json`
- [ ] Configure Azure AD credentials in `appsettings.json`
- [ ] Run `dotnet restore` to restore NuGet packages
- [ ] Run `dotnet ef database update` to create database
- [ ] Run `dotnet run` to start the server
- [ ] Navigate to `https://localhost:7200/swagger` to view API documentation

## Project Overview

This is a clean template for building ASP.NET Core 9 Web API applications following Clean Architecture and Repository patterns.

### Technology Stack

- **Framework**: .NET 9
- **ORM**: Entity Framework Core 9
- **Authentication**: JWT Bearer tokens
- **Documentation**: Swagger/OpenAPI
- **Cloud Integration**: Microsoft Graph API
- **Excel**: ClosedXML, EPPlus
- **Document Processing**: Syncfusion, DocXCore

## Architecture Overview

### Clean Architecture Layers

#### 1. Core Layer (Domain)
- **Purpose**: Contains business logic contracts and domain models
- **Dependencies**: None (pure interfaces and models)
- **Contents**:
  - Interfaces for services, repositories, and helpers
  - DTOs (Data Transfer Objects)
  - Entities
  - Enums

#### 2. Persistence Layer (Infrastructure)
- **Purpose**: Implements Core layer interfaces
- **Dependencies**: Core layer, EF Core, external libraries
- **Contents**:
  - Service implementations
  - Repository implementations
  - DbContext implementations
  - Entity configurations

#### 3. Controllers (Presentation)
- **Purpose**: HTTP API endpoints
- **Dependencies**: Core layer interfaces
- **Contents**:
  - API controllers
  - Request/Response handling

### Design Patterns

#### Repository Pattern
Abstracts data access logic:
```
Interface (Core) ? Implementation (Persistence) ? DbContext
```

#### Unit of Work Pattern
Manages transactions across multiple repositories:
```
Service ? Unit of Work ? DbContext.SaveChanges()
```

#### Dependency Injection
All services registered in Program.cs with scoped lifetime.

## Folder Structure Details

### Core/Applications/
Service interfaces that define business operations.
- Example: `IUserAuthenticationService`, `IGlobalServices`

### Core/Repositories/
Data access interfaces for entities.
- Base: `IRepository<T>` - Generic repository interface
- Specific: Extend base for custom queries

### Core/Models/
Domain models and data structures.
- **Entities/**: Database entities (inherit from `BaseEntity`)
- **Dtos/**: Data transfer objects for API
- **Components/**: Shared component models
- **Enum/**: Enumerations

### Persistence/DbContext/
EF Core database contexts.
- `CurrentApplicationDbContext` - Main application database
- `SuperApplicationDbContext` - Shared/system database

### Persistence/EntityConfigurations/
EF Core Fluent API configurations.
- Separated by database and type (Tables/Views)
- Implements `IEntityTypeConfiguration<T>`

### Persistence/Repositories/
Repository implementations.
- Inherit from `Repository<T>` base class
- Add custom query methods

### Persistence/Applications/
Service implementations.
- Implement business logic
- Coordinate repositories and helpers

### Controllers/
API endpoints.
- Inherit from `BaseController` for common functionality
- Use dependency injection for services
- Return standardized responses

## Configuration Files

### appsettings.json
Production configuration:
- Domain URL
- File storage location
- Azure AD credentials
- Microsoft Graph settings

### appsettings.Development.json
Development overrides:
- Local database connections
- Development-specific settings

### launchSettings.json
IDE configuration:
- Launch URLs
- Environment variables
- Port settings

## Common Scenarios

### Scenario 1: Add a New Feature Module

1. **Create Entity**
   ```csharp
   // Core/Models/Entities/CurrentApplication/Tables/Product.cs
   public class Product : BaseEntity
   {
       public string Name { get; set; } = string.Empty;
       public decimal Price { get; set; }
   }
   ```

2. **Configure Entity**
   ```csharp
   // Persistence/EntityConfigurations/CurrentApplication/Tables/ProductConfig.cs
   public class ProductConfig : IEntityTypeConfiguration<Product>
   {
       public void Configure(EntityTypeBuilder<Product> builder)
       {
           builder.ToTable("Product");
           builder.HasKey(e => e.Id);
           builder.Property(e => e.Name).IsRequired().HasMaxLength(200);
       }
   }
   ```

3. **Add to DbContext**
   ```csharp
   public DbSet<Product> Products { get; set; }
   ```

4. **Create Repository**
   ```csharp
   // Core/Repositories/IProductRepository.cs
   public interface IProductRepository : IRepository<Product>
   {
       Task<IEnumerable<Product>> GetByPriceRangeAsync(decimal min, decimal max);
   }
   
   // Persistence/Repositories/ProductRepository.cs
   public class ProductRepository : Repository<Product>, IProductRepository
   {
       public ProductRepository(ICurrentApplicationDbContext context) : base(context) { }
       
       public async Task<IEnumerable<Product>> GetByPriceRangeAsync(decimal min, decimal max)
       {
           return await _dbSet.Where(p => p.Price >= min && p.Price <= max).ToListAsync();
       }
   }
   ```

5. **Create Service**
   ```csharp
   // Core/Applications/IProductService.cs
   public interface IProductService
   {
       Task<ProductDto> GetByIdAsync(int id);
       Task<IEnumerable<ProductDto>> GetAllAsync();
   }
   
   // Persistence/Applications/ProductService.cs
   public class ProductService : IProductService
   {
       private readonly IProductRepository _repository;
       
       public ProductService(IProductRepository repository)
       {
           _repository = repository;
       }
       
       public async Task<ProductDto> GetByIdAsync(int id)
       {
           var product = await _repository.GetByIdAsync(id);
           // Map to DTO and return
       }
   }
   ```

6. **Register Services** in Program.cs
   ```csharp
   builder.Services.AddScoped<IProductRepository, ProductRepository>();
   builder.Services.AddScoped<IProductService, ProductService>();
   ```

7. **Create Controller**
   ```csharp
   [ApiController]
   [Route("api/[controller]")]
   public class ProductController : BaseController
   {
       private readonly IProductService _service;
       
       public ProductController(IProductService service, ILogger<ProductController> logger) 
           : base(logger)
       {
           _service = service;
       }
       
       [HttpGet]
       public async Task<IActionResult> GetAll()
       {
           try
           {
               var products = await _service.GetAllAsync();
               return Success(products);
           }
           catch (Exception ex)
           {
               return HandleError(ex, "Failed to retrieve products");
           }
       }
   }
   ```

### Scenario 2: Add Email Functionality

1. Use `IEmailService` to send emails
2. Create email DTOs
3. Implement in service layer
4. Call from controllers

### Scenario 3: Add Authentication to Endpoint

```csharp
[Authorize] // Require authentication
[HttpGet]
public IActionResult ProtectedEndpoint()
{
    var userId = User.Identity?.Name;
    // Implementation
}
```

## Database Migrations

### Create Migration
```bash
dotnet ef migrations add MigrationName
```

### Apply Migration
```bash
dotnet ef database update
```

### Rollback Migration
```bash
dotnet ef database update PreviousMigrationName
```

### Remove Last Migration
```bash
dotnet ef migrations remove
```

### Generate SQL Script
```bash
dotnet ef migrations script
```

## Testing

Add unit tests in a separate test project:

```bash
dotnet new xunit -n Core.Agile.Template.Web.Server.Tests
dotnet add reference ../Core.Agile.Template.Web.Server/Core.Agile.Template.Web.Server.csproj
```

## Deployment

### Publish for Production

```bash
dotnet publish -c Release -o ./publish
```

### Configuration Checklist

- [ ] Update connection strings for production database
- [ ] Set `ASPNETCORE_ENVIRONMENT` to "Production"
- [ ] Configure proper CORS origins
- [ ] Use HTTPS certificates
- [ ] Secure sensitive configuration (use Azure Key Vault or similar)
- [ ] Update `BaseFileLocation` path

## Security Considerations

1. **Never commit sensitive data** to version control
2. **Use environment variables** for secrets in production
3. **Enable HTTPS** in production
4. **Validate all inputs** from API requests
5. **Use parameterized queries** (EF Core does this by default)
6. **Implement proper authorization** checks
7. **Keep packages up to date** for security patches

## Support and Maintenance

### Updating Packages

```bash
# Check for outdated packages
dotnet list package --outdated

# Update specific package
dotnet add package PackageName --version x.x.x

# Update all packages (be careful)
dotnet outdated --upgrade
```

### Code Quality

- Follow C# coding conventions
- Use meaningful names
- Keep methods small and focused
- Write XML documentation for public APIs
- Use code analysis tools

## Additional Notes

- The SPA proxy is configured for Vite development server on port 52862
- CORS is configured for localhost:5173 (Vite default)
- Swagger is only enabled in Development environment
- Authentication uses external identity server at `https://system.onecoredevit.com/cas/services/identity_server`

## Customization

To customize this template for your specific application:

1. Rename the project and namespaces
2. Update configuration values
3. Remove sample entities and controllers
4. Add your domain-specific models and services
5. Update README with your project details
