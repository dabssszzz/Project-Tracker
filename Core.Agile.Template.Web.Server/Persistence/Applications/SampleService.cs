using Core.Agile.Template.Web.Server.Core.Applications;
using Core.Agile.Template.Web.Server.Core.Models.Dtos.CurrentApplication;
using Core.Agile.Template.Web.Server.Core.Models.Entities.CurrentApplication.Tables;
using Core.Agile.Template.Web.Server.Core.Repositories;
using Core.Agile.Template.Web.Server.Core.UnitOfWork;

namespace Core.Agile.Template.Web.Server.Persistence.Applications;

public class SampleService : ISampleService
{
    private readonly ISampleRepository _repository;
    private readonly ICurrentApplicationUnitOfWork _unitOfWork;

    public SampleService(ISampleRepository repository, ICurrentApplicationUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<SampleDto?> GetByIdAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToDto(entity);
    }

    public async Task<IEnumerable<SampleDto>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToDto);
    }

    public async Task<IEnumerable<SampleDto>> GetActiveItemsAsync()
    {
        var entities = await _repository.GetActiveItemsAsync();
        return entities.Select(MapToDto);
    }

    public async Task<int> CreateAsync(SampleDto dto)
    {
        var entity = new SampleEntity
        {
            Name = dto.Name,
            Description = dto.Description,
            CreatedDate = DateTime.UtcNow,
            IsActive = dto.IsActive
        };

        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        
        return entity.Id;
    }

    public async Task UpdateAsync(SampleDto dto)
    {
        var entity = await _repository.GetByIdAsync(dto.Id);
        if (entity == null)
        {
            throw new InvalidOperationException($"SampleEntity with ID {dto.Id} not found");
        }

        entity.Name = dto.Name;
        entity.Description = dto.Description;
        entity.ModifiedDate = DateTime.UtcNow;
        entity.IsActive = dto.IsActive;

        await _repository.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
    }

    private static SampleDto MapToDto(SampleEntity entity)
    {
        return new SampleDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            IsActive = entity.IsActive
        };
    }
}
