using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Repositories.Interfaces;

namespace Catalog.Host.Repositories;

public class CatalogBrandRepository : ICatalogBrandRepository
{
    private readonly ApplicationDbContext _dbContext;

    private readonly ILogger<CatalogItemRepository> _logger;

    public CatalogBrandRepository(
        IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
        ILogger<CatalogItemRepository> logger)
    {
        _dbContext = dbContextWrapper.DbContext;
        _logger = logger;
    }

    public async Task<int?> AddAsync(string brand)
    {
        var addItem = new CatalogBrand { Brand = brand, };

        var item = await _dbContext.CatalogBrands.AddAsync(addItem);

        await _dbContext.SaveChangesAsync();

        return item.Entity.Id;
    }

    public async Task<int?> DeleteAsync(int id)
    {
        var item = await _dbContext.CatalogBrands.FirstOrDefaultAsync(cb => cb.Id == id);

        if (item != null)
        {
            _dbContext.CatalogBrands.Remove(item);

            await _dbContext.SaveChangesAsync();

            return item.Id;
        }
        else
        {
            return null;
        }
    }

    public async Task<IEnumerable<CatalogBrand>?> GetBrandsAsync()
    {
        var result = await _dbContext.CatalogBrands.OrderBy(cb => cb.Brand).ToListAsync();

        return result;
    }

    public async Task<CatalogBrand?> GetByBrandIdAsync(int id)
    {
        var result = await _dbContext.CatalogBrands.FirstOrDefaultAsync(cb => cb.Id == id);

        return result;
    }

    public async Task<int?> UpdateAsync(int id, string brand)
    {
        var item = await _dbContext.CatalogBrands.FirstOrDefaultAsync(cb => cb.Id == id);

        if (item != null)
        {
            item.Brand = brand;

            _dbContext.CatalogBrands.Update(item);

            await _dbContext.SaveChangesAsync();

            return item.Id;
        }
        else
        {
            return null;
        }
    }
}
