using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubtasksController(ISubtaskService service, ILogger<SubtasksController> logger)
    : BaseController(logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try { return Success(await service.GetAllAsync()); }
        catch (Exception ex) { return HandleError(ex, "Failed to get subtasks"); }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await service.GetByIdAsync(id);
            return data == null ? NotFoundError($"Subtask {id} not found") : Success(data);
        }
        catch (Exception ex) { return HandleError(ex, $"Failed to get subtask {id}"); }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SubtaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = await service.CreateAsync(dto);
            return Success(new { id }, "Subtask created");
        }
        catch (Exception ex) { return HandleError(ex, "Failed to create subtask"); }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] SubtaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest(new { error = "ID mismatch" });
            await service.UpdateAsync(dto);
            return Success(dto, "Subtask updated");
        }
        catch (InvalidOperationException ex) { return NotFoundError(ex.Message); }
        catch (Exception ex) { return HandleError(ex, $"Failed to update subtask {id}"); }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try { await service.DeleteAsync(id); return Success(new { id }, "Subtask deleted"); }
        catch (Exception ex) { return HandleError(ex, $"Failed to delete subtask {id}"); }
    }
}
