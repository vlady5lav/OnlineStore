namespace Catalog.Host.Services.Interfaces;

public interface ICatalogTypeService
{
    Task<int?> AddAsync(string type);

    Task<int?> DeleteAsync(int id);

    Task<int?> UpdateAsync(int id, string type);
}
