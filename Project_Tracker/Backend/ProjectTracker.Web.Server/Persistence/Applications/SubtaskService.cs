using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class SubtaskService(ISubtaskRepository repo, IProjectTrackerUnitOfWork uow) : ISubtaskService
{
    public async Task<IEnumerable<SubtaskDto>> GetAllAsync()
    {
        var entities = await repo.GetAllWithHierarchyAsync();
        return entities.Select(ToDto);
    }

    public async Task<SubtaskDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<int> CreateAsync(SubtaskDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(SubtaskDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Subtask {dto.Id} not found.");
        
        entity.Name = dto.Name;
        entity.MainTaskId = dto.MainTaskId;
        entity.AssigneeId = dto.AssigneeId;
        entity.Status = dto.Status;
        entity.Details = dto.Details;
        entity.ModifiedDate = DateTime.UtcNow;
        
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static SubtaskDto ToDto(SubtaskEntity e) => new()
    {
        Id = e.Id,
        Name = e.Name,
        TaskCode = $"ST-{e.Id:D3}",
        Status = e.Status,
        Details = e.Details,
        MainTaskId = e.MainTaskId,
        MainTaskName = e.MainTask?.Name,
        CategoryName = e.MainTask?.Category?.Name,
        ProjectName = e.MainTask?.Category?.Project?.Name,
        AssigneeId = e.AssigneeId,
        AssigneeName = e.Assignee?.Name,
        SubtaskCategoryNames = string.Join(", ", e.SubtaskCategories.Select(sc => sc.Name))
    };

    private static SubtaskEntity ToEntity(SubtaskDto d) => new()
    {
        Id = d.Id,
        Name = d.Name,
        MainTaskId = d.MainTaskId,
        AssigneeId = d.AssigneeId,
        Status = d.Status,
        Details = d.Details
    };
}

