using Catalog.Host.Data.Entities;

namespace Catalog.Host.Repositories.Interfaces;

public interface ICatalogTypeRepository
{
    Task<int?> AddAsync(string type);

    Task<int?> DeleteAsync(int id);

    Task<CatalogType?> GetByTypeIdAsync(int id);

    Task<IEnumerable<CatalogType>?> GetTypesAsync();

    Task<int?> UpdateAsync(int id, string type);
}
