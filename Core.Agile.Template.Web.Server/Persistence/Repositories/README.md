# Persistence Layer - Repositories

This folder contains the implementation of repository interfaces defined in Core/Repositories.

## Purpose

Implement data access logic using Entity Framework Core for specific entities.

## Example

```csharp
public class SampleRepository : Repository<SampleEntity>, ISampleRepository
{
    public SampleRepository(ICurrentApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<SampleEntity>> GetActiveItemsAsync()
    {
        return await _dbSet.Where(x => x.IsActive).ToListAsync();
    }
    
    public async Task<SampleEntity?> GetByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
    }
}
```
