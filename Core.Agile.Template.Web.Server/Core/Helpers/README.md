# Core Layer - Helpers

This folder contains helper interfaces for common utility operations.

## Purpose

Define interfaces for helper classes that provide reusable functionality across the application.

## Example

```csharp
public interface IYourHelper
{
    Task<string> FormatDataAsync(object data);
    bool ValidateData(object data);
}
```
