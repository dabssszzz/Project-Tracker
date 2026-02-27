using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class MainTaskEntityConfig : IEntityTypeConfiguration<MainTaskEntity>
{
    public void Configure(EntityTypeBuilder<MainTaskEntity> builder)
    {
        builder.ToTable("MainTasks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);

        builder.HasOne(x => x.Category)
               .WithMany(x => x.MainTasks)
               .HasForeignKey(x => x.CategoryId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(x => x.Subtasks)
               .WithOne(x => x.MainTask)
               .HasForeignKey(x => x.MainTaskId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
