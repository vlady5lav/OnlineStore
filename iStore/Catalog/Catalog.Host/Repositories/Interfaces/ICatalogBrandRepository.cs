using Catalog.Host.Data.Entities;

namespace Catalog.Host.Repositories.Interfaces;

public interface ICatalogBrandRepository
{
    Task<int?> AddAsync(string brand);

    Task<int?> DeleteAsync(int id);

    Task<IEnumerable<CatalogBrand>?> GetBrandsAsync();

    Task<CatalogBrand?> GetByBrandIdAsync(int id);

    Task<int?> UpdateAsync(int id, string brand);
}
