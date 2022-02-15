namespace Catalog.UnitTests.Services;

public class CatalogServiceTest
{
    private readonly Mock<ICatalogBrandRepository> _catalogBrandRepository;

    private readonly Mock<ICatalogItemRepository> _catalogItemRepository;

    private readonly ICatalogService _catalogService;

    private readonly Mock<ICatalogTypeRepository> _catalogTypeRepository;

    private readonly Mock<IDbContextTransaction> _dbContextTransaction;

    private readonly Mock<IDbContextWrapper<ApplicationDbContext>> _dbContextWrapper;

    private readonly Mock<ILogger<CatalogService>> _logger;

    private readonly Mock<IMapper> _mapper;

    public CatalogServiceTest()
    {
        _catalogBrandRepository = new Mock<ICatalogBrandRepository>();
        _catalogItemRepository = new Mock<ICatalogItemRepository>();
        _catalogTypeRepository = new Mock<ICatalogTypeRepository>();
        _dbContextTransaction = new Mock<IDbContextTransaction>();
        _dbContextWrapper = new Mock<IDbContextWrapper<ApplicationDbContext>>();
        _logger = new Mock<ILogger<CatalogService>>();
        _mapper = new Mock<IMapper>();

        _dbContextWrapper.Setup(s => s.BeginTransactionAsync(It.IsAny<CancellationToken>())).ReturnsAsync(_dbContextTransaction.Object);

        _catalogService = new CatalogService(
            _dbContextWrapper.Object,
            _logger.Object,
            _mapper.Object,
            _catalogBrandRepository.Object,
            _catalogItemRepository.Object,
            _catalogTypeRepository.Object);
    }

    [Fact]
    public async Task GetBrandsAsync_Failed()
    {
        // arrange
        _catalogBrandRepository
            .Setup(s => s.GetBrandsAsync())
            .ReturnsAsync((Func<IEnumerable<CatalogBrand>?>)null!);

        // act
        var result = await _catalogService.GetBrandsAsync();

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetBrandsAsync_Success()
    {
        // arrange
        IEnumerable<CatalogBrand> catalogBrandsSuccess = new List<CatalogBrand>()
        {
            new CatalogBrand() { Id = 1, Brand = "Brand", },
        };

        IEnumerable<CatalogBrandDto> catalogBrandsDtoSuccess = new List<CatalogBrandDto>()
        {
            new CatalogBrandDto() { Id = 1, Brand = "Brand", },
        };

        _catalogBrandRepository.Setup(s => s.GetBrandsAsync()).ReturnsAsync(catalogBrandsSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<IEnumerable<CatalogBrandDto>?>(
                        It.Is<IEnumerable<CatalogBrand>?>(i => i!.Equals(catalogBrandsSuccess))))
            .Returns(catalogBrandsDtoSuccess);

        // act
        var result = await _catalogService.GetBrandsAsync();

        // assert
        result?.Should().BeSameAs(catalogBrandsDtoSuccess);
    }

    [Fact]
    public async Task GetCatalogItemsAsync_Failed()
    {
        // arrange
        var testPageIndex = 1000;
        var testPageSize = 10000;
        var brandIdFilter = 2;
        var typeIdFilter = 2;
        PaginatedItems<CatalogItem> item = null!;

        _catalogItemRepository
            .Setup(
                s =>
                    s.GetByPageAsync(
                        It.Is<int>(i => i == testPageSize),
                        It.Is<int>(i => i == testPageIndex),
                        It.Is<int>(i => i == brandIdFilter),
                        It.Is<int>(i => i == typeIdFilter)))
            .ReturnsAsync(item);

        // act
        var result = await _catalogService.GetCatalogItemsAsync(testPageSize, testPageIndex, brandIdFilter, typeIdFilter);

        // assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetCatalogItemsAsync_Success()
    {
        // arrange
        var testPageIndex = 0;
        var testPageSize = 4;
        var testTotalCount = 12;
        var brandIdFilter = 2;
        var typeIdFilter = 2;

        var catalogItemSuccess = new CatalogItem() { Id = 0, Name = "Product", };

        var catalogItemDtoSuccess = new CatalogItemDto() { Id = 0, Name = "Product", };

        var pagingPaginatedItemsSuccess = new PaginatedItems<CatalogItem>()
        {
            Data = new List<CatalogItem>() { catalogItemSuccess, },
            TotalCount = testTotalCount,
        };

        _catalogItemRepository
            .Setup(
                s =>
                    s.GetByPageAsync(
                        It.Is<int>(i => i == testPageSize),
                        It.Is<int>(i => i == testPageIndex),
                        It.Is<int?>(i => i == brandIdFilter),
                        It.Is<int?>(i => i == typeIdFilter)))
            .ReturnsAsync(pagingPaginatedItemsSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<CatalogItemDto>(
                        It.Is<CatalogItem?>(i => i!.Equals(catalogItemSuccess))))
            .Returns(catalogItemDtoSuccess);

        // act
        var result = await _catalogService.GetCatalogItemsAsync(testPageSize, testPageIndex, brandIdFilter, typeIdFilter);

        // assert
        result.Should().NotBeNull();
        result?
            .Data.Should()
            .BeEquivalentTo(new List<CatalogItemDto>() { catalogItemDtoSuccess });
        result?.Count.Should().Be(testTotalCount);
        result?.PageIndex.Should().Be(testPageIndex);
        result?.PageSize.Should().Be(testPageSize);
    }

    [Fact]
    public async Task GetProductByIdAsync_Failed()
    {
        // arrange
        var catalogItemFailed = new CatalogItem() { };

        var catalogItemDtoFailed = new CatalogItemDto() { };

        _catalogItemRepository
            .Setup(s => s.GetByIdAsync(It.Is<int>(i => i == catalogItemFailed.Id)))
            .Returns((Func<CatalogItem>)null!);

        // act
        var result = await _catalogService.GetCatalogItemByIdAsync(catalogItemFailed.Id);

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetProductByIdAsync_Success()
    {
        // arrange
        var catalogItemSuccess = new CatalogItem()
        {
            Id = 1,
            Name = "Name",
            Price = 1000,
            AvailableStock = 100,
            Description = "Description",
        };

        var catalogItemDtoSuccess = new CatalogItemDto()
        {
            Id = 1,
            Name = "Name",
            Price = 1000,
            AvailableStock = 100,
            Description = "Description",
        };

        _catalogItemRepository
            .Setup(s => s.GetByIdAsync(It.Is<int>(i => i == catalogItemSuccess.Id)))
            .ReturnsAsync(catalogItemSuccess);

        // act
        var result = await _catalogService.GetCatalogItemByIdAsync(catalogItemSuccess.Id);

        // assert
        result?.Should().BeSameAs(catalogItemDtoSuccess);
    }

    [Fact]
    public async Task GetProductsAsync_Failed()
    {
        // arrange
        _catalogItemRepository
            .Setup(s => s.GetProductsAsync())
            .ReturnsAsync((Func<IEnumerable<CatalogItem>?>)null!);

        // act
        var result = await _catalogService.GetProductsAsync();

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetProductsAsync_Success()
    {
        // arrange
        IEnumerable<CatalogItem> catalogItemsSuccess = new List<CatalogItem>()
        {
            new CatalogItem()
            {
                Id = 1,
                Name = "Name",
                Price = 1000,
                AvailableStock = 100,
                Description = "Description",
            },
        };

        IEnumerable<CatalogItemDto> catalogItemsDtoSuccess = new List<CatalogItemDto>()
        {
            new CatalogItemDto()
            {
                Id = 1,
                Name = "Name",
                Price = 1000,
                AvailableStock = 100,
                Description = "Description",
            },
        };

        _catalogItemRepository
            .Setup(s => s.GetProductsAsync())
            .ReturnsAsync(catalogItemsSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<IEnumerable<CatalogItemDto>?>(
                        It.Is<IEnumerable<CatalogItem>?>(i => i!.Equals(catalogItemsSuccess))))
            .Returns(catalogItemsDtoSuccess);

        // act
        var result = await _catalogService.GetProductsAsync();

        // assert
        result?.Should().BeSameAs(catalogItemsDtoSuccess);
    }

    [Fact]
    public async Task GetTypesAsync_Failed()
    {
        // arrange
        IEnumerable<CatalogType> catalogTypesFailed = new List<CatalogType>() { };

        IEnumerable<CatalogTypeDto> catalogTypesDtoFailed = new List<CatalogTypeDto>() { };

        _catalogTypeRepository
            .Setup(s => s.GetTypesAsync())
            .ReturnsAsync((Func<IEnumerable<CatalogType>?>)null!);

        // act
        var result = await _catalogService.GetTypesAsync();

        // assert
        result?.Should().BeNull();
    }

    [Fact]
    public async Task GetTypesAsync_Success()
    {
        // arrange
        IEnumerable<CatalogType> catalogTypesSuccess = new List<CatalogType>()
        {
            new CatalogType() { Id = 1, Type = "Type", },
        };

        IEnumerable<CatalogTypeDto> catalogTypesDtoSuccess = new List<CatalogTypeDto>()
        {
            new CatalogTypeDto() { Id = 1, Type = "Type", },
        };

        _catalogTypeRepository.Setup(s => s.GetTypesAsync()).ReturnsAsync(catalogTypesSuccess);

        _mapper
            .Setup(
                s =>
                    s.Map<IEnumerable<CatalogTypeDto>?>(
                        It.Is<IEnumerable<CatalogType>?>(i => i!.Equals(catalogTypesSuccess))))
            .Returns(catalogTypesDtoSuccess);

        // act
        var result = await _catalogService.GetTypesAsync();

        // assert
        result?.Should().BeSameAs(catalogTypesDtoSuccess);
    }
}
