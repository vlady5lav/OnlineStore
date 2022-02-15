using Catalog.Host.Data;
using Catalog.Host.Data.Entities;
using Catalog.Host.Repositories.Interfaces;

namespace Catalog.Host.Repositories;

public class CatalogItemRepository : ICatalogItemRepository
{
    private readonly ApplicationDbContext _dbContext;

    private readonly ILogger<CatalogItemRepository> _logger;

    public CatalogItemRepository(
        IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
        ILogger<CatalogItemRepository> logger)
    {
        _dbContext = dbContextWrapper.DbContext;
        _logger = logger;
    }

    public async Task<int?> AddAsync(
        string name,
        decimal price,
        int availableStock,
        int catalogBrandId,
        int catalogTypeId,
        string? description = null,
        string? pictureFileName = null)
    {
        var addItem = new CatalogItem
        {
            Name = name,
            Price = price,
            AvailableStock = availableStock,
            CatalogBrandId = catalogBrandId,
            CatalogTypeId = catalogTypeId,
            Description = description ?? null,
            PictureFileName = pictureFileName ?? null,
        };

        var item = await _dbContext.CatalogItems.AddAsync(addItem);

        await _dbContext.SaveChangesAsync();

        return item.Entity.Id;
    }

    public async Task<int?> DeleteAsync(int id)
    {
        var item = await _dbContext.CatalogItems.FirstOrDefaultAsync(ci => ci.Id == id);

        if (item != null)
        {
            _dbContext.CatalogItems.Remove(item);

            await _dbContext.SaveChangesAsync();

            return item.Id;
        }
        else
        {
            return null;
        }
    }

    public async Task<CatalogItem?> GetByIdAsync(int id)
    {
        var result = await _dbContext.CatalogItems
            .Include(ci => ci.CatalogBrand)
            .Include(ci => ci.CatalogType)
            .FirstOrDefaultAsync(ci => ci.Id == id);

        return result;
    }

    public async Task<PaginatedItems<CatalogItem>?> GetByPageAsync(
        int pageSize,
        int pageIndex,
        int? brandFilter,
        int? typeFilter)
    {
        IQueryable<CatalogItem> query = _dbContext.CatalogItems;

        if (brandFilter.HasValue)
        {
            query = query.Where(w => w.CatalogBrandId == brandFilter.Value);
        }

        if (typeFilter.HasValue)
        {
            query = query.Where(w => w.CatalogTypeId == typeFilter.Value);
        }

        var totalItems = await query.LongCountAsync();

        var itemsOnPage = await query
            .OrderBy(ci => ci.CatalogBrandId)
            .ThenBy(ci => ci.Name)
            .Include(ci => ci.CatalogBrand)
            .Include(ci => ci.CatalogType)
            .Skip(pageSize * pageIndex)
            .Take(pageSize)
            .ToListAsync();

        return new PaginatedItems<CatalogItem>() { TotalCount = totalItems, Data = itemsOnPage };
    }

    public async Task<IEnumerable<CatalogItem>?> GetProductsAsync()
    {
        var result = await _dbContext.CatalogItems
            .OrderBy(ci => ci.CatalogBrandId)
            .ThenBy(ci => ci.Name)
            .Include(ci => ci.CatalogBrand)
            .Include(ci => ci.CatalogType)
            .ToListAsync();

        return result;
    }

    public async Task<int?> UpdateAsync(
        int id,
        string? name = null,
        decimal? price = null,
        int? availableStock = null,
        int? catalogBrandId = null,
        int? catalogTypeId = null,
        string? description = null,
        string? pictureFileName = null)
    {
        var item = await _dbContext.CatalogItems.FirstOrDefaultAsync(ci => ci.Id == id);

        if (item != null)
        {
            item.Name = name ?? item.Name;
            item.Price = price ?? item.Price;
            item.AvailableStock = availableStock ?? item.AvailableStock;
            item.CatalogBrandId = catalogBrandId ?? item.CatalogBrandId;
            item.CatalogTypeId = catalogTypeId ?? item.CatalogTypeId;
            item.Description = description ?? item.Description;
            item.PictureFileName = pictureFileName ?? item.PictureFileName;

            _dbContext.CatalogItems.Update(item);

            await _dbContext.SaveChangesAsync();

            return item.Id;
        }
        else
        {
            return null;
        }
    }
}
