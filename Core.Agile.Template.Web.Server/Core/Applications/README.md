# Core Layer - Applications

This folder contains application service interfaces that define the business logic contracts.

## Purpose

Define interfaces for application services that orchestrate domain logic and coordinate between different repositories and services.

## Example

```csharp
public interface IYourService
{
    Task<YourDto> GetDataAsync(int id);
    Task<bool> ProcessDataAsync(YourDto dto);
}
```
