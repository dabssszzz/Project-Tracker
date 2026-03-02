using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Core.UnitOfWork;

namespace ProjectTracker.Web.Server.Persistence.Applications;

public class ReportService(IReportRepository repo, IProjectTrackerUnitOfWork uow) : IReportService
{
    public async Task<IEnumerable<ReportDto>> GetAllAsync()
    {
        var entities = await repo.GetAllWithDetailsAsync();
        return entities.Select(ToDto);
    }

    public async Task<ReportDto?> GetByIdAsync(int id)
    {
        var entity = await repo.GetByIdAsync(id);
        return entity == null ? null : ToDto(entity);
    }

    public async Task<int> CreateAsync(ReportDto dto)
    {
        var entity = ToEntity(dto);
        await repo.AddAsync(entity);
        await uow.SaveChangesAsync();
        return entity.Id;
    }

    public async Task UpdateAsync(ReportDto dto)
    {
        var entity = await repo.GetByIdAsync(dto.Id)
            ?? throw new InvalidOperationException($"Report {dto.Id} not found.");
        
        UpdateEntity(entity, dto);
        entity.Date_Update = DateTime.UtcNow;
        
        await repo.UpdateAsync(entity);
        await uow.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        await repo.DeleteAsync(id);
        await uow.SaveChangesAsync();
    }

    private static ReportDto ToDto(ReportEntity e) => new()
    {
        Id = e.Id,
        ProjectId = e.ProjectId,
        ProjectName = e.Project?.Name,
        CategoryId = e.CategoryId,
        CategoryName = e.Category?.Name,
        MaintaskId = e.MaintaskId,
        MaintaskName = e.Maintask?.Name,
        SubtaskId = e.SubtaskId,
        SubtaskName = e.Subtask?.Name,
        Subtask_CategoryId = e.Subtask_CategoryId,
        Subtask_CategoryName = e.Subtask_Category?.Name,
        AssigneeId = e.AssigneeId,
        AssigneeName = e.Assignee?.Name,
        Details = e.Details,
        StatusId = e.StatusId,
        StatusName = e.Status?.Name,
        Date_Start = e.Date_Start,
        Date_Completed = e.Date_Completed,
        Date_Create = e.Date_Create,
        Date_Update = e.Date_Update,
        Is_Deleted = e.Is_Deleted
    };

    private static ReportEntity ToEntity(ReportDto d)
    {
        var e = new ReportEntity();
        UpdateEntity(e, d);
        return e;
    }

    private static void UpdateEntity(ReportEntity e, ReportDto d)
    {
        e.ProjectId = d.ProjectId;
        e.CategoryId = d.CategoryId;
        e.MaintaskId = d.MaintaskId;
        e.SubtaskId = d.SubtaskId;
        e.Subtask_CategoryId = d.Subtask_CategoryId;
        e.AssigneeId = d.AssigneeId;
        e.Details = d.Details;
        e.StatusId = d.StatusId;
        e.Date_Start = d.Date_Start;
        e.Date_Completed = d.Date_Completed;
        e.Is_Deleted = d.Is_Deleted;
    }
}
