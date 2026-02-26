using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class MainTaskEntityConfig : IEntityTypeConfiguration<MainTaskEntity>
{
    public void Configure(EntityTypeBuilder<MainTaskEntity> builder)
    {
        builder.ToTable("MainTasks");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(300);
        builder.Property(e => e.IsActive).IsRequired().HasDefaultValue(true);
    }
}
