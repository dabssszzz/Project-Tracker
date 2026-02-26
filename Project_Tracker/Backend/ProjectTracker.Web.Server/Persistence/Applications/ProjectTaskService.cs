using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class ProjectTaskService : IProjectTaskService
{
    private readonly IProjectTaskRepository _repository;
    private readonly IProjectTrackerUnitOfWork _unitOfWork;

    public ProjectTaskService(IProjectTaskRepository repository, IProjectTrackerUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ProjectTaskDto>> GetAllAsync()
        => (await _repository.GetAllWithDetailsAsync()).Select(MapToDto);

    public async Task<IEnumerable<ProjectTaskDto>> GetFilteredAsync(ProjectTaskFilterDto filter)
        => (await _repository.GetFilteredAsync(filter)).Select(MapToDto);

    public async Task<ProjectTaskDto?> GetByIdAsync(int id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToDto(entity);
    }

    public async Task<int> CreateAsync(ProjectTaskDto dto)
    {
        var taskCode = await _repository.GenerateTaskCodeAsync();
        var entity = new ProjectTaskEntity
        {
            TaskCode   = taskCode,
            ProjectId  = dto.ProjectId,
            CategoryId = dto.CategoryId,
            MainTaskId = dto.MainTaskId,
            Subtask    = dto.Subtask,
            SubtaskCategories = dto.SubtaskCategories,
            Details    = dto.Details,
            Status     = dto.Status,
            Assignee   = dto.Assignee,
            CompletedDate = dto.CompletedDate,
            IsActive   = true,
            CreatedDate = DateTime.UtcNow
        };
        await _repository.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(ProjectTaskDto dto)
    {
        var entity = await _repository.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"ProjectTask with ID {dto.Id} not found.");

        entity.ProjectId  = dto.ProjectId;
        entity.CategoryId = dto.CategoryId;
        entity.MainTaskId = dto.MainTaskId;
        entity.Subtask    = dto.Subtask;
        entity.SubtaskCategories = dto.SubtaskCategories;
        entity.Details    = dto.Details;
        entity.Status     = dto.Status;
        entity.Assignee   = dto.Assignee;
        entity.CompletedDate = dto.CompletedDate;
        entity.IsActive   = dto.IsActive;
        entity.ModifiedDate = DateTime.UtcNow;

        await _repository.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
    }

    private static ProjectTaskDto MapToDto(ProjectTaskEntity e) => new()
    {
        Id               = e.Id,
        TaskCode         = e.TaskCode,
        ProjectId        = e.ProjectId,
        ProjectName      = e.Project?.Name,
        CategoryId       = e.CategoryId,
        CategoryName     = e.Category?.Name,
        MainTaskId       = e.MainTaskId,
        MainTaskName     = e.MainTask?.Name,
        Subtask          = e.Subtask,
        SubtaskCategories= e.SubtaskCategories,
        Details          = e.Details,
        Status           = e.Status,
        Assignee         = e.Assignee,
        CreatedDate      = e.CreatedDate,
        CompletedDate    = e.CompletedDate,
        IsActive         = e.IsActive
    };
}
