using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class MainTaskService : IMainTaskService
{
    private readonly IMainTaskRepository _repository;
    private readonly IProjectTrackerUnitOfWork _unitOfWork;

    public MainTaskService(IMainTaskRepository repository, IProjectTrackerUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<MainTaskDto>> GetAllAsync()
        => (await _repository.GetAllAsync()).Select(MapToDto);

    public async Task<MainTaskDto?> GetByIdAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToDto(entity);
    }

    public async Task<int> CreateAsync(MainTaskDto dto)
    {
        var entity = new MainTaskEntity { Name = dto.Name, IsActive = true, CreatedDate = DateTime.UtcNow };
        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(MainTaskDto dto)
    {
        var entity = await _repository.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"MainTask with ID {dto.Id} not found.");
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

    private static MainTaskDto MapToDto(MainTaskEntity e) => new()
    {
        Id = e.Id, Name = e.Name, IsActive = e.IsActive, CreatedDate = e.CreatedDate
    };
}
