using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class CategoryService(ICategoryRepository repo, IProjectTrackerUnitOfWork uow) : ICategoryService
{
    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        var entities = await repo.GetAllAsync();
        return entities.Select(ToDto);
    }

    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<int> CreateAsync(CategoryDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(CategoryDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Category {dto.Id} not found.");
        entity.Name = dto.Name;
        entity.ProjectId = dto.ProjectId;
        entity.ModifiedDate = DateTime.UtcNow;
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static CategoryDto ToDto(CategoryEntity e) => new() { Id = e.Id, Name = e.Name, ProjectId = e.ProjectId };
    private static CategoryEntity ToEntity(CategoryDto d) => new() { Name = d.Name, ProjectId = d.ProjectId };
}
