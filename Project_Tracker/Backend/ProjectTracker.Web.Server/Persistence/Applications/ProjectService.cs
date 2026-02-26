using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly IProjectTrackerUnitOfWork _unitOfWork;

    public ProjectService(IProjectRepository repository, IProjectTrackerUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToDto);
    }

    public async Task<ProjectDto?> GetByIdAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToDto(entity);
    }

    public async Task<int> CreateAsync(ProjectDto dto)
    {
        var entity = new ProjectEntity { Name = dto.Name, IsActive = true, CreatedDate = DateTime.UtcNow };
        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(ProjectDto dto)
    {
        var entity = await _repository.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Project with ID {dto.Id} not found.");
        entity.Name = dto.Name;
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

    private static ProjectDto MapToDto(ProjectEntity e) => new()
    {
        Id = e.Id, Name = e.Name, IsActive = e.IsActive, CreatedDate = e.CreatedDate
    };
}
