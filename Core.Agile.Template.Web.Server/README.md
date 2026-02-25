# Core.Agile.Template.Web.Server

A clean template for ASP.NET Core 9 Web API projects following the Core Agile architecture pattern.

## Project Structure

```
Core.Agile.Template.Web.Server/
??? Core/                                   # Domain layer (Interfaces and Models)
?   ??? Applications/                       # Application service interfaces
?   ??? DbContext/                         # Database context interfaces
?   ??? Helpers/                           # Helper interfaces
?   ??? Models/                            # Domain models
?   ?   ??? Components/                    # Shared component DTOs
?   ?   ??? Dtos/                          # Data Transfer Objects
?   ?   ?   ??? Global/                    # Global DTOs
?   ?   ?   ??? Service/                   # Service-related DTOs
?   ?   ??? Entities/                      # Database entities
?   ?   ??? Enum/                          # Enumerations
?   ??? Repositories/                      # Repository interfaces
?   ??? ServiceLibraries/                  # Service library interfaces
?   ??? UnitOfWork/                        # Unit of Work interfaces
?
??? Persistence/                           # Infrastructure layer (Implementations)
?   ??? Applications/                      # Application service implementations
?   ??? ComponentServices/                 # Component service implementations
?   ??? DbContext/                         # Database context implementations
?   ??? EntityConfigurations/              # EF Core entity configurations
?   ??? Helpers/                           # Helper implementations
?   ??? Repositories/                      # Repository implementations
?   ??? ServiceLibraries/                  # Service library implementations
?   ??? UnitOfWork/                        # Unit of Work implementations
?
??? Controllers/                           # API Controllers
```

## Features

- **ASP.NET Core 9** - Latest .NET framework
- **Entity Framework Core 9** - ORM for database operations
- **JWT Authentication** - Bearer token authentication
- **Swagger/OpenAPI** - API documentation
- **CORS** - Configured for local development
- **Microsoft Graph** - Integration with Microsoft 365 services
- **Excel Processing** - ClosedXML and EPPlus support
- **Word/PDF Processing** - Syncfusion and DocumentFormat.OpenXml support
- **SPA Proxy** - Vite development server integration

## Configuration

### Database Connections

Update `appsettings.json` or `appsettings.Development.json` with your connection strings:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_DATABASE_CONNECTION_STRING",
    "SuperApplicationConnection": "YOUR_SUPER_APP_CONNECTION_STRING"
  }
}
```

### Azure AD Configuration

Configure Azure AD settings for Microsoft Graph integration:

```json
{
  "AzureAd": {
    "ClientId": "YOUR_CLIENT_ID",
    "TenantId": "YOUR_TENANT_ID",
    "ClientSecret": "YOUR_CLIENT_SECRET"
  }
}
```

## Architecture Patterns

### Clean Architecture

The project follows Clean Architecture principles:

- **Core Layer**: Contains interfaces and domain models (no dependencies)
- **Persistence Layer**: Contains implementations and infrastructure concerns
- **Controllers**: API endpoints that use services from Core layer

### Dependency Injection

All services are registered in `Program.cs` following these patterns:

- Database contexts (Scoped)
- Application services (Scoped)
- Unit of Work (Scoped)
- Service libraries (Scoped)
- Helpers (Scoped)

### Repository Pattern

Repositories are used to abstract data access logic:

```csharp
// Interface in Core/Repositories
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
}

// Implementation in Persistence/Repositories
public class Repository<T> : IRepository<T> where T : class
{
    // Implementation
}
```

### Unit of Work Pattern

Coordinates database transactions across multiple repositories.

## Getting Started

1. **Clone the repository**
2. **Update configuration files** with your connection strings and Azure AD settings
3. **Run database migrations** (if applicable)
4. **Start the application**:
   ```bash
   dotnet run
   ```

## API Documentation

When running in development mode, Swagger UI is available at:
- `https://localhost:{port}/swagger`

## Development

### Adding a New Feature

1. Define interfaces in `Core/Applications/` or `Core/Repositories/`
2. Create DTOs in `Core/Models/Dtos/`
3. Implement interfaces in `Persistence/`
4. Register services in `Program.cs`
5. Create controller in `Controllers/`

### Entity Framework

Add entity configurations in `Persistence/EntityConfigurations/` following this pattern:

```csharp
public class YourEntityConfig : IEntityTypeConfiguration<YourEntity>
{
    public void Configure(EntityTypeBuilder<YourEntity> builder)
    {
        // Configuration
    }
}
```

## Dependencies

Key NuGet packages:
- Microsoft.EntityFrameworkCore.SqlServer (9.0.4)
- Microsoft.AspNetCore.Authentication.JwtBearer (9.0.4)
- Microsoft.Graph (5.100.0)
- Swashbuckle.AspNetCore (8.1.1)
- ClosedXML (0.105.0)
- EPPlus (8.2.1)
- Syncfusion.DocIO.Net.Core (31.2.15)

## License

[Your License Here]
