# Persistence Layer - Applications

This folder contains the implementation of application services defined in Core/Applications.

## Purpose

Implement the business logic interfaces with concrete classes that coordinate repositories, helpers, and other services.

## Example

```csharp
public class YourService : IYourService
{
    private readonly IYourRepository _repository;
    private readonly ICurrentApplicationUnitOfWork _unitOfWork;
    
    public YourService(IYourRepository repository, ICurrentApplicationUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }
    
    public async Task<YourDto> GetDataAsync(int id)
    {
        // Implementation
    }
}
```
