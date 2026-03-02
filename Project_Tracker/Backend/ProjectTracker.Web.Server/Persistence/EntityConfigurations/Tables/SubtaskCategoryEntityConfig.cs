using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class SubtaskCategoryEntityConfig : IEntityTypeConfiguration<SubtaskCategoryEntity>
{
    public void Configure(EntityTypeBuilder<SubtaskCategoryEntity> builder)
    {
        builder.ToTable("SubtaskCategories");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);

        builder.HasOne(x => x.Subtask)
            .WithMany(x => x.SubtaskCategories)
            .HasForeignKey(x => x.SubtaskId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
