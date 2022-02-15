using Catalog.Host.Data;
using Catalog.Host.Models.Dtos;
using Catalog.Host.Models.Responses;
using Catalog.Host.Repositories.Interfaces;
using Catalog.Host.Services.Interfaces;

namespace Catalog.Host.Services;

public class CatalogService : BaseDataService<ApplicationDbContext>, ICatalogService
{
    private readonly ICatalogBrandRepository _catalogBrandRepository;

    private readonly ICatalogItemRepository _catalogItemRepository;

    private readonly ICatalogTypeRepository _catalogTypeRepository;

    private readonly IMapper _mapper;

    public CatalogService(
        IDbContextWrapper<ApplicationDbContext> dbContextWrapper,
        ILogger<BaseDataService<ApplicationDbContext>> logger,
        IMapper mapper,
        ICatalogBrandRepository catalogBrandRepository,
        ICatalogItemRepository catalogItemRepository,
        ICatalogTypeRepository catalogTypeRepository)
        : base(dbContextWrapper, logger)
    {
        _catalogBrandRepository = catalogBrandRepository;
        _catalogItemRepository = catalogItemRepository;
        _catalogTypeRepository = catalogTypeRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CatalogBrandDto>?> GetBrandsAsync()
    {
        return await ExecuteSafeAsync(
            async () =>
            {
                var result = await _catalogBrandRepository.GetBrandsAsync();

                if (result == null)
                {
                    return null;
                }

                return _mapper.Map<IEnumerable<CatalogBrandDto>?>(result);
            });
    }

    public async Task<PaginatedItemsResponse<CatalogItemDto>?> GetCatalogItemsAsync(
        int pageSize = 10,
        int pageIndex = 0,
        int? brandIdFilter = null,
        int? typeIdFilter = null)
    {
        return await ExecuteSafeAsync(async () =>
        {
            var result = await _catalogItemRepository.GetByPageAsync(
                pageSize,
                pageIndex,
                brandIdFilter,
                typeIdFilter);

            if (result == null)
            {
                return null;
            }

            return new PaginatedItemsResponse<CatalogItemDto>()
            {
                Count = result.TotalCount,
                Data = result.Data.Select(ci => _mapper.Map<CatalogItemDto>(ci)).ToList(),
                PageIndex = pageIndex,
                PageSize = pageSize,
            };
        });
    }

    public async Task<CatalogItemDto?> GetCatalogItemByIdAsync(int id)
    {
        return await ExecuteSafeAsync(
            async () =>
            {
                var result = await _catalogItemRepository.GetByIdAsync(id);

                if (result == null)
                {
                    return null;
                }

                return _mapper.Map<CatalogItemDto>(result);
            });
    }

    public async Task<IEnumerable<CatalogItemDto>?> GetProductsAsync()
    {
        return await ExecuteSafeAsync(
            async () =>
            {
                var result = await _catalogItemRepository.GetProductsAsync();

                if (result == null)
                {
                    return null;
                }

                return _mapper.Map<IEnumerable<CatalogItemDto>?>(result);
            });
    }

    public async Task<IEnumerable<CatalogTypeDto>?> GetTypesAsync()
    {
        return await ExecuteSafeAsync(
            async () =>
            {
                var result = await _catalogTypeRepository.GetTypesAsync();

                if (result == null)
                {
                    return null;
                }

                return _mapper.Map<IEnumerable<CatalogTypeDto>?>(result);
            });
    }
}
