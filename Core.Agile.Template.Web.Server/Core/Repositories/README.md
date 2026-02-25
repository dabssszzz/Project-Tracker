# Core Layer - Repositories

This folder contains repository interfaces for data access.

## Purpose

Define interfaces for repositories that handle database operations for specific entities.

## Example

```csharp
public interface ISampleRepository : IRepository<SampleEntity>
{
    Task<IEnumerable<SampleEntity>> GetActiveItemsAsync();
    Task<SampleEntity?> GetByNameAsync(string name);
}
```
