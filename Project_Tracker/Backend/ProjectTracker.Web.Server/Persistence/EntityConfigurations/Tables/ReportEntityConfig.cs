using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class ReportEntityConfig : IEntityTypeConfiguration<ReportEntity>
{
    public void Configure(EntityTypeBuilder<ReportEntity> builder)
    {
        builder.ToTable("Reports");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Details).IsRequired();

        builder.HasOne(x => x.Project)
               .WithMany()
               .HasForeignKey(x => x.ProjectId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Category)
               .WithMany()
               .HasForeignKey(x => x.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Maintask)
               .WithMany()
               .HasForeignKey(x => x.MaintaskId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Subtask)
               .WithMany()
               .HasForeignKey(x => x.SubtaskId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Subtask_Category)
               .WithMany()
               .HasForeignKey(x => x.Subtask_CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Assignee)
               .WithMany()
               .HasForeignKey(x => x.AssigneeId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Status)
               .WithMany()
               .HasForeignKey(x => x.StatusId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.Date_Start).IsRequired();
        builder.Property(x => x.Date_Create).IsRequired();
    }
}
