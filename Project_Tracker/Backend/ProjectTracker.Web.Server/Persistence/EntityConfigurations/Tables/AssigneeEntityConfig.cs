using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;

namespace ProjectTracker.Web.Server.Persistence.EntityConfigurations.Tables;

public class AssigneeEntityConfig : IEntityTypeConfiguration<AssigneeEntity>
{
    public void Configure(EntityTypeBuilder<AssigneeEntity> builder)
    {
        builder.ToTable("Assignees");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
    }
}
