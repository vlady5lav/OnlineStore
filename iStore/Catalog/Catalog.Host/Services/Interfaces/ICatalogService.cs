using Catalog.Host.Models.Dtos;
using Catalog.Host.Models.Responses;

namespace Catalog.Host.Services.Interfaces;

public interface ICatalogService
{
    Task<IEnumerable<CatalogBrandDto>?> GetBrandsAsync();

    Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(
        int pageSize = 10,
        int pageIndex = 0,
        int? brandIdFilter = null,
        int? typeIdFilter = null);

    Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id);

    Task<IEnumerable<CatalogItemDto>?> GetProductsAsync();

    Task<IEnumerable<CatalogTypeDto>?> GetTypesAsync();
}
