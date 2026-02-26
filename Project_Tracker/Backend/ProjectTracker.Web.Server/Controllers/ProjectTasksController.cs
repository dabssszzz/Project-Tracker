using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectTasksController : BaseController
{
    private readonly IProjectTaskService _service;

    public ProjectTasksController(IProjectTaskService service, ILogger<ProjectTasksController> logger) : base(logger)
        => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try { return Success(await _service.GetAllAsync()); }
        catch (Exception ex) { return HandleError(ex, "Failed to get project tasks"); }
    }

    [HttpGet("filter")]
    public async Task<IActionResult> GetFiltered([FromQuery] ProjectTaskFilterDto filter)
    {
        try { return Success(await _service.GetFilteredAsync(filter)); }
        catch (Exception ex) { return HandleError(ex, "Failed to filter project tasks"); }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await _service.GetByIdAsync(id);
            return data == null ? NotFoundError($"ProjectTask {id} not found") : Success(data);
        }
        catch (Exception ex) { return HandleError(ex, $"Failed to get project task {id}"); }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProjectTaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = await _service.CreateAsync(dto);
            return Success(new { id }, "Task created successfully");
        }
        catch (Exception ex) { return HandleError(ex, "Failed to create task"); }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectTaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest(new { error = "ID mismatch" });
            await _service.UpdateAsync(dto);
            return Success(dto, "Task updated successfully");
        }
        catch (InvalidOperationException ex) { return NotFoundError(ex.Message); }
        catch (Exception ex) { return HandleError(ex, $"Failed to update task {id}"); }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try { await _service.DeleteAsync(id); return Success(new { id }, "Task deleted successfully"); }
        catch (Exception ex) { return HandleError(ex, $"Failed to delete task {id}"); }
    }
}
