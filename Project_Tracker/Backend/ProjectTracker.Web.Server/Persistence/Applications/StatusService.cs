using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class StatusService(IStatusRepository repo, IProjectTrackerUnitOfWork uow) : IStatusService
{
    public async Task<IEnumerable<StatusDto>> GetAllAsync()
    {
        var entities = await repo.GetAllAsync();
        return entities.Select(ToDto);
    }

    public async Task<StatusDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<int> CreateAsync(StatusDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(StatusDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Status {dto.Id} not found.");
        entity.Name = dto.Name;
        entity.ModifiedDate = DateTime.UtcNow;
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static StatusDto ToDto(StatusEntity e) => new() { Id = e.Id, Name = e.Name };
    private static StatusEntity ToEntity(StatusDto d) => new() { Name = d.Name };
}
