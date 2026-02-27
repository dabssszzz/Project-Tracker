using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(IProjectService service, ILogger<ProjectsController> logger)
    : BaseController(logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try { return Success(await service.GetAllAsync()); }
        catch (Exception ex) { return HandleError(ex, "Failed to get projects"); }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await service.GetByIdAsync(id);
            return data == null ? NotFoundError($"Project {id} not found") : Success(data);
        }
        catch (Exception ex) { return HandleError(ex, $"Failed to get project {id}"); }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProjectDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = await service.CreateAsync(dto);
            return Success(new { id }, "Project created");
        }
        catch (Exception ex) { return HandleError(ex, "Failed to create project"); }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest(new { error = "ID mismatch" });
            await service.UpdateAsync(dto);
            return Success(dto, "Project updated");
        }
        catch (InvalidOperationException ex) { return NotFoundError(ex.Message); }
        catch (Exception ex) { return HandleError(ex, $"Failed to update project {id}"); }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try { await service.DeleteAsync(id); return Success(new { id }, "Project deleted"); }
        catch (Exception ex) { return HandleError(ex, $"Failed to delete project {id}"); }
    }
}
