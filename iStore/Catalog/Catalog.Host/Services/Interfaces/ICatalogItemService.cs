namespace Catalog.Host.Services.Interfaces;

public interface ICatalogItemService
{
    Task<int?> AddAsync(
        string name,
        decimal price,
        int availableStock,
        int catalogBrandId,
        int catalogTypeId,
        string? description = null,
        string? pictureFileName = null);

    Task<int?> DeleteAsync(int id);

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
