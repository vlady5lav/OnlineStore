using Catalog.Host.Data;
using Catalog.Host.Repositories.Interfaces;
using Catalog.Host.Services.Interfaces;

namespace Catalog.Host.Services;

public class CatalogTypeService : BaseDataService<ApplicationDbContext>, ICatalogTypeService
{
    private readonly ICatalogTypeRepository _catalogTypeRepository;

    public CatalogTypeService(
        IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
        ILogger<BaseDataService<ApplicationDbContext>> logger,
        ICatalogTypeRepository catalogTypeRepository)
        : base(dbContextWrapper, logger)
    {
        _catalogTypeRepository = catalogTypeRepository;
    }

    public async Task<int?> AddAsync(string type)
    {
        return await ExecuteSafeAsync(async () => await _catalogTypeRepository.AddAsync(type));
    }

    public async Task<int?> DeleteAsync(int id)
    {
        return await ExecuteSafeAsync(async () => await _catalogTypeRepository.DeleteAsync(id));
    }

    public async Task<int?> UpdateAsync(int id, string type)
    {
        return await ExecuteSafeAsync(async () => await _catalogTypeRepository.UpdateAsync(id, type));
    }
}
