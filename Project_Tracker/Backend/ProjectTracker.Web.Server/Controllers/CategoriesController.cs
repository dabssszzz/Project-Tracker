using Microsoft.AspNetCore.Mvc;
using ProjectTracker.Web.Server.Core.Applications;
using ProjectTracker.Web.Server.Core.Models.Dtos;

namespace ProjectTracker.Web.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryService service, ILogger<CategoriesController> logger)
    : BaseController(logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try { return Success(await service.GetAllAsync()); }
        catch (Exception ex) { return HandleError(ex, "Failed to get categories"); }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var data = await service.GetByIdAsync(id);
            return data == null ? NotFoundError($"Category {id} not found") : Success(data);
        }
        catch (Exception ex) { return HandleError(ex, $"Failed to get category {id}"); }
    }

    [HttpGet("project/{projectId:int}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> GetByProject(int projectId)
    {
        try { return Success(await service.GetByProjectAsync(projectId)); }
        catch (Exception ex) { return HandleError(ex, $"Failed to get categories for project {projectId}"); }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var id = await service.CreateAsync(dto);
            return Success(new { id }, "Category created");
        }
        catch (Exception ex) { return HandleError(ex, "Failed to create category"); }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryDto dto)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest(new { error = "ID mismatch" });
            await service.UpdateAsync(dto);
            return Success(dto, "Category updated");
        }
        catch (InvalidOperationException ex) { return NotFoundError(ex.Message); }
        catch (Exception ex) { return HandleError(ex, $"Failed to update category {id}"); }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try { await service.DeleteAsync(id); return Success(new { id }, "Category deleted"); }
        catch (Exception ex) { return HandleError(ex, $"Failed to delete category {id}"); }
    }
}
