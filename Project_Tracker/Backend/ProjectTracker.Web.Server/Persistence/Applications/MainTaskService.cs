using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class MainTaskService(IMainTaskRepository repo, IProjectTrackerUnitOfWork uow) : IMainTaskService
{
    public async Task<IEnumerable<MainTaskDto>> GetAllAsync()
    {
        var entities = await repo.GetAllAsync();
        return entities.Select(ToDto);
    }

    public async Task<MainTaskDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<IEnumerable<MainTaskDto>> GetByCategoryAsync(int categoryId)
    {
        var entities = await repo.GetByCategoryIdAsync(categoryId);
        return entities.Select(ToDto);
    }

    public async Task<int> CreateAsync(MainTaskDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(MainTaskDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"MainTask {dto.Id} not found.");
        entity.Name = dto.Name;
        entity.CategoryId = dto.CategoryId;
        entity.ModifiedDate = DateTime.UtcNow;
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static MainTaskDto ToDto(MainTaskEntity e) => new() { Id = e.Id, Name = e.Name, CategoryId = e.CategoryId };
    private static MainTaskEntity ToEntity(MainTaskDto d) => new() { Name = d.Name, CategoryId = d.CategoryId };
}
