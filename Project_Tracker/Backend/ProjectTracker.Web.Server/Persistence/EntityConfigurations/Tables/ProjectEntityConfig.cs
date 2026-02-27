using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class ProjectEntityConfig : IEntityTypeConfiguration<ProjectEntity>
{
    public void Configure(EntityTypeBuilder<ProjectEntity> builder)
    {
        builder.ToTable("Projects");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);

        builder.HasMany(x => x.Categories)
               .WithOne(x => x.Project)
               .HasForeignKey(x => x.ProjectId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
