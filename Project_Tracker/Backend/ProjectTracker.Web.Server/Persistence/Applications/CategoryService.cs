using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;
    private readonly IProjectTrackerUnitOfWork _unitOfWork;

    public CategoryService(ICategoryRepository repository, IProjectTrackerUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        => (await _repository.GetAllAsync()).Select(MapToDto);

    public async Task<IEnumerable<CategoryDto>> GetByProjectIdAsync(int projectId)
        => (await _repository.GetByProjectIdAsync(projectId)).Select(MapToDto);

    public async Task<CategoryDto?> GetByIdAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToDto(entity);
    }

    public async Task<int> CreateAsync(CategoryDto dto)
    {
        var entity = new CategoryEntity { Name = dto.Name, ProjectId = dto.ProjectId, IsActive = true, CreatedDate = DateTime.UtcNow };
        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(CategoryDto dto)
    {
        var entity = await _repository.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Category with ID {dto.Id} not found.");
        entity.Name = dto.Name;
        entity.ProjectId = dto.ProjectId;
        entity.IsActive = dto.IsActive;
        entity.ModifiedDate = DateTime.UtcNow;
        await _repository.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
    }

    private static CategoryDto MapToDto(CategoryEntity e) => new()
    {
        Id = e.Id, Name = e.Name, ProjectId = e.ProjectId,
        ProjectName = e.Project?.Name, IsActive = e.IsActive, CreatedDate = e.CreatedDate
    };
}
