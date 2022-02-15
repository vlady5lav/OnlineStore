using Catalog.Host.Models.Dtos;
using Catalog.Host.Models.Requests;
using Catalog.Host.Models.Responses;
using Catalog.Host.Services.Interfaces;

namespace Catalog.Host.Controllers;

[ApiController]
[Authorize(Policy = AuthPolicy.AllowEndUserPolicy)]
[Scope("catalog.bff")]
[Route(ComponentDefaults.DefaultRoute)]
public class CatalogBffController : ControllerBase
{
    private readonly ICatalogService _catalogService;

    private readonly ILogger<CatalogBffController> _logger;

    public CatalogBffController(
        ILogger<CatalogBffController> logger,
        ICatalogService catalogService)
    {
        _logger = logger;
        _catalogService = catalogService;
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CatalogBrandDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetBrands()
    {
        var result = await _catalogService.GetBrandsAsync();

        if (result != null && result.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(PaginatedItemsResponse<CatalogItemDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetCatalogItems(PaginatedItemsRequest request)
    {
        var brandIdFilter = request.BrandIdFilter == 0 ? null : request.BrandIdFilter;
        var typeIdFilter = request.TypeIdFilter == 0 ? null : request.TypeIdFilter;

        var result =
            await _catalogService.GetCatalogItemsAsync(
                request.PageSize,
                request.PageIndex,
                brandIdFilter,
                typeIdFilter);

        if (result != null && result.Data.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(CatalogItemDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetCatalogItemById(int id)
    {
        var result = await _catalogService.GetCatalogItemByIdAsync(id);

        if (result != null)
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CatalogItemDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetProducts()
    {
        var result = await _catalogService.GetProductsAsync();

        if (result != null && result.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<CatalogTypeDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.NotFound)]
    public async Task<IActionResult> GetTypes()
    {
        var result = await _catalogService.GetTypesAsync();

        if (result != null && result.Any())
        {
            return Ok(result);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(typeof(UserIdResponse<int>), (int)HttpStatusCode.OK)]
    public IActionResult GetUserId()
    {
        var userIdString = User.Claims.FirstOrDefault(x => x.Type == "sub")?.Value;

        var userIdNum = int.TryParse(userIdString, out var userId);

        _logger.LogWarning($"User [ id: {userId} ] logged in successfully!");

        var response = new UserIdResponse<int>() { Id = userId };

        return Ok(response);
    }
}
