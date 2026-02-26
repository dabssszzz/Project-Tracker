using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MainTasksController : BaseController
{
    private readonly IMainTaskService _service;

    public MainTasksController(IMainTaskService service, ILogger<MainTasksController> logger) : base(logger)
        => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try { return Success(await _service.GetAllAsync()); }
        catch (Exception ex) { return HandleError(ex, "Failed to get main tasks"); }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await _service.GetByIdAsync(id);
            return data == null ? NotFoundError($"MainTask {id} not found") : Success(data);
        }
        catch (Exception ex) { return HandleError(ex, $"Failed to get main task {id}"); }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MainTaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = await _service.CreateAsync(dto);
            return Success(new { id }, "Main task created successfully");
        }
        catch (Exception ex) { return HandleError(ex, "Failed to create main task"); }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] MainTaskDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest(new { error = "ID mismatch" });
            await _service.UpdateAsync(dto);
            return Success(dto, "Main task updated successfully");
        }
        catch (InvalidOperationException ex) { return NotFoundError(ex.Message); }
        catch (Exception ex) { return HandleError(ex, $"Failed to update main task {id}"); }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try { await _service.DeleteAsync(id); return Success(new { id }, "Main task deleted"); }
        catch (Exception ex) { return HandleError(ex, $"Failed to delete main task {id}"); }
    }
}
