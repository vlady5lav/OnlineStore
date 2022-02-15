using Catalog.Host.Data;
using Catalog.Host.Data.Entities;

namespace Catalog.Host.Repositories.Interfaces;

public interface ICatalogItemRepository
{
    Task<int?> AddAsync(
    string name,
    decimal price,
    int availableStock,
    int catalogBrandId,
    int catalogTypeId,
    string? description = null,
    string? pictureFileName = null);

    Task<int?> DeleteAsync(
        int id);

    Task<CatalogItem?> GetByIdAsync(
        int id);

    Task<PaginatedItems<CatalogItem>?> GetByPageAsync(
        int pageSize,
        int pageIndex,
        int? brandFilter,
        int? typeFilter);

    Task<IEnumerable<CatalogItem>?> GetProductsAsync();

    Task<int?> UpdateAsync(
        int id,
        string? name = null,
        decimal? price = null,
        int? availableStock = null,
        int? catalogBrandId = null,
        int? catalogTypeId = null,
        string? description = null,
        string? pictureFileName = null);
}
