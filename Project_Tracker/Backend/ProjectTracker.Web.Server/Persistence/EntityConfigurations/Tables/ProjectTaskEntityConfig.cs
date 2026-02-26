using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class ProjectTaskEntityConfig : IEntityTypeConfiguration<ProjectTaskEntity>
{
    public void Configure(EntityTypeBuilder<ProjectTaskEntity> builder)
    {
        builder.ToTable("ProjectTasks");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.TaskCode).IsRequired().HasMaxLength(50);
        builder.Property(e => e.Status).IsRequired().HasMaxLength(50);
        builder.Property(e => e.Subtask).HasMaxLength(500);
        builder.Property(e => e.SubtaskCategories).HasMaxLength(300);
        builder.Property(e => e.Details).HasMaxLength(2000);
        builder.Property(e => e.Assignee).HasMaxLength(200);
        builder.Property(e => e.IsActive).IsRequired().HasDefaultValue(true);

        builder.HasOne(e => e.Project)
               .WithMany(p => p.Tasks)
               .HasForeignKey(e => e.ProjectId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.Category)
               .WithMany(c => c.Tasks)
               .HasForeignKey(e => e.CategoryId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(e => e.MainTask)
               .WithMany(m => m.Tasks)
               .HasForeignKey(e => e.MainTaskId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
