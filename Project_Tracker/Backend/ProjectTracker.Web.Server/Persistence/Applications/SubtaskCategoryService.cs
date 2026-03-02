using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class SubtaskCategoryService(ISubtaskCategoryRepository repo, IProjectTrackerUnitOfWork uow) : ISubtaskCategoryService
{
    public async Task<IEnumerable<SubtaskCategoryDto>> GetAllAsync()
    {
        var entities = await repo.GetAllAsync();
        return entities.Select(ToDto);
    }

    public async Task<SubtaskCategoryDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<IEnumerable<SubtaskCategoryDto>> GetBySubtaskAsync(int subtaskId)
    {
        var entities = await repo.GetBySubtaskIdAsync(subtaskId);
        return entities.Select(ToDto);
    }

    public async Task<int> CreateAsync(SubtaskCategoryDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(SubtaskCategoryDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"SubtaskCategory {dto.Id} not found.");
        
        entity.Name = dto.Name;
        entity.SubtaskId = dto.SubtaskId;
        entity.ModifiedDate = DateTime.UtcNow;
        
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static SubtaskCategoryDto ToDto(SubtaskCategoryEntity e) => new() 
    { 
        Id = e.Id, 
        Name = e.Name,
        SubtaskId = e.SubtaskId
    };

    private static SubtaskCategoryEntity ToEntity(SubtaskCategoryDto d) => new() 
    { 
        Id = d.Id,
        Name = d.Name,
        SubtaskId = d.SubtaskId
    };
}
