using Core.Agile.Template.Web.Server.Core.Applications;
using Core.Agile.Template.Web.Server.Core.Models.Dtos.CurrentApplication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Core.Agile.Template.Web.Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SampleController : BaseController
{
    private readonly ISampleService _sampleService;

    public SampleController(ISampleService sampleService, ILogger<SampleController> logger) : base(logger)
    {
        _sampleService = sampleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var data = await _sampleService.GetAllAsync();
            return Success(data);
        }
        catch (Exception ex)
        {
            return HandleError(ex, "Failed to retrieve data");
        }
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        try
        {
            var data = await _sampleService.GetActiveItemsAsync();
            return Success(data);
        }
        catch (Exception ex)
        {
            return HandleError(ex, "Failed to retrieve active items");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await _sampleService.GetByIdAsync(id);
            if (data == null)
            {
                return NotFound(new { error = $"Sample with ID {id} not found" });
            }
            return Success(data);
        }
        catch (Exception ex)
        {
            return HandleError(ex, $"Failed to retrieve data with ID {id}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SampleDto model)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await _sampleService.CreateAsync(model);
            return Success(new { id }, "Record created successfully");
        }
        catch (Exception ex)
        {
            return HandleError(ex, "Failed to create record");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SampleDto model)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.Id)
            {
                return BadRequest(new { error = "ID mismatch" });
            }

            await _sampleService.UpdateAsync(model);
            return Success(model, "Record updated successfully");
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return HandleError(ex, $"Failed to update record with ID {id}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _sampleService.DeleteAsync(id);
            return Success(new { id }, "Record deleted successfully");
        }
        catch (Exception ex)
        {
            return HandleError(ex, $"Failed to delete record with ID {id}");
        }
    }
}
