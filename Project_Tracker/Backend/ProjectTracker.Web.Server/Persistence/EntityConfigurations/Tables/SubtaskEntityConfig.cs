using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class SubtaskEntityConfig : IEntityTypeConfiguration<SubtaskEntity>
{
    public void Configure(EntityTypeBuilder<SubtaskEntity> builder)
    {
        builder.ToTable("Subtasks");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(500);

        builder.HasOne(x => x.MainTask)
            .WithMany(x => x.Subtasks)
            .HasForeignKey(x => x.MainTaskId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
