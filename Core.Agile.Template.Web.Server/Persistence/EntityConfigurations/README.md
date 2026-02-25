# Entity Configurations

This folder contains Entity Framework Core entity configurations.

## Structure

- `CurrentApplication/` - Configurations for the current application database
  - `Tables/` - Table entity configurations
  - `Views/` - View entity configurations
- `SuperApplication/` - Configurations for the super application database

## Example Configuration

```csharp
public class YourEntityConfig : IEntityTypeConfiguration<YourEntity>
{
    public void Configure(EntityTypeBuilder<YourEntity> builder)
    {
        builder.ToTable("YourTable");
        
        builder.HasKey(e => e.Id);
        
        builder.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(200);
    }
}
```
