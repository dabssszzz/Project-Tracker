# Component Services

This folder contains reusable component services that provide common functionality across the application.

## Purpose

Component services are utility classes that provide specific functionality such as:
- Data table processing
- File conversion
- Data transformation
- Common calculations

## Example

```csharp
public class DataTableComponent
{
    public DataTableResponseDto<T> ProcessDataTable<T>(
        IQueryable<T> query,
        int draw,
        int start,
        int length,
        string searchValue)
    {
        var recordsTotal = query.Count();
        
        // Apply search filter
        if (!string.IsNullOrEmpty(searchValue))
        {
            // Apply search logic
        }
        
        var recordsFiltered = query.Count();
        
        // Apply pagination
        var data = query.Skip(start).Take(length).ToList();
        
        return new DataTableResponseDto<T>
        {
            RecordsTotal = recordsTotal,
            RecordsFiltered = recordsFiltered,
            Data = data
        };
    }
}
```

## Guidelines

- Keep component services stateless when possible
- Make them reusable across different features
- Focus on single responsibility
- Use dependency injection for required dependencies
