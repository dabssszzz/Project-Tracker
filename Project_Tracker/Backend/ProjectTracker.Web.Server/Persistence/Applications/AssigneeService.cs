using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class AssigneeService(IAssigneeRepository repo, IProjectTrackerUnitOfWork uow) : IAssigneeService
{
    public async Task<IEnumerable<AssigneeDto>> GetAllAsync()
    {
        var entities = await repo.GetAllAsync();
        return entities.Select(ToDto);
    }

    public async Task<AssigneeDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<int> CreateAsync(AssigneeDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(AssigneeDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Assignee {dto.Id} not found.");
        entity.Name = dto.Name;
        entity.Email = dto.Email;
        entity.ModifiedDate = DateTime.UtcNow;
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static AssigneeDto ToDto(AssigneeEntity e) => new() { Id = e.Id, Name = e.Name, Email = e.Email };
    private static AssigneeEntity ToEntity(AssigneeDto d) => new() { Name = d.Name, Email = d.Email };
}
