using Basket.Host.Configurations;
using Basket.Host.Services;
using Basket.Host.Services.Interfaces;

namespace Basket.UnitTests.Services;

public class CacheServiceTest
{
    private readonly ICacheService _cacheService;

    private readonly Mock<IOptions<RedisConfig>> _config;

    private readonly Mock<IConnectionMultiplexer> _connectionMultiplexer;

    private readonly Mock<IJsonSerializer> _jsonSerializer;

    private readonly Mock<ILogger<CacheService>> _logger;

    private readonly Mock<IRedisCacheConnectionService> _redisCacheConnectionService;

    private readonly Mock<IDatabase> _redisDataBase;

    public CacheServiceTest()
    {
        _config = new Mock<IOptions<RedisConfig>>();
        _logger = new Mock<ILogger<CacheService>>();

        _config.Setup(x => x.Value).Returns(new RedisConfig() { CacheTimeout = TimeSpan.Zero });

        _redisCacheConnectionService = new Mock<IRedisCacheConnectionService>();
        _connectionMultiplexer = new Mock<IConnectionMultiplexer>();
        _redisDataBase = new Mock<IDatabase>();

        _connectionMultiplexer
            .Setup(x => x.GetDatabase(
                It.IsAny<int>(),
                It.IsAny<object>()))
            .Returns(_redisDataBase.Object);

        _redisCacheConnectionService
            .Setup(x => x.Connection)
            .Returns(_connectionMultiplexer.Object);

        _jsonSerializer = new Mock<IJsonSerializer>();

        _cacheService =
            new CacheService(
                _logger.Object,
                _redisCacheConnectionService.Object,
                _config.Object,
                _jsonSerializer.Object);
    }

    [Fact]
    public async Task AddOrUpdateAsync_Add_Success()
    {
        // arrange
        var testEntity = new
        {
            UserId = "TestUserId",
            Data = "data",
        };

        _redisDataBase.Setup(expression: x => x.StringSetAsync(
                It.IsAny<RedisKey>(),
                It.IsAny<RedisValue>(),
                It.IsAny<TimeSpan?>(),
                It.IsAny<When>(),
                It.IsAny<CommandFlags>()))
            .ReturnsAsync(true);

        // act
        await _cacheService.AddOrUpdateAsync(testEntity.UserId, testEntity.Data);

        // assert
        _logger.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Contains($"Cached value for key {testEntity.UserId} cached")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
            Times.Once);
    }

    [Fact]
    public async Task AddOrUpdateAsync_Failed()
    {
        // arrange
        var testEntity = new
        {
            UserId = "TestUserId",
            Data = "data",
        };

        _redisDataBase.Setup(expression: x => x.StringSetAsync(
                It.IsAny<RedisKey>(),
                It.IsAny<RedisValue>(),
                It.IsAny<TimeSpan?>(),
                It.IsAny<When>(),
                It.IsAny<CommandFlags>()))
            .ReturnsAsync(false);

        // act
        await _cacheService.AddOrUpdateAsync(testEntity.UserId, testEntity.Data);

        // assert
        _logger.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Contains($"Cached value for key {testEntity.UserId} cached")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
            Times.Never);
    }

    [Fact]
    public async Task AddOrUpdateAsync_Update_Success()
    {
        // arrange
        var testEntity = new
        {
            UserId = "TestUserId",
            Data = "data",
        };

        _redisDataBase.Setup(expression: x => x.StringSetAsync(
                It.IsAny<RedisKey>(),
                It.IsAny<RedisValue>(),
                It.IsAny<TimeSpan?>(),
                It.IsAny<When>(),
                It.IsAny<CommandFlags>()))
            .ReturnsAsync(true);

        // act
        await _cacheService.AddOrUpdateAsync(testEntity.UserId, testEntity.Data);
        await _cacheService.AddOrUpdateAsync(testEntity.UserId, testEntity.Data);

        // assert
        _logger.Verify(
            x => x.Log(
                LogLevel.Information,
                It.IsAny<EventId>(),
                It.Is<It.IsAnyType>((o, t) => o.ToString()!
                    .Contains($"Cached value for key {testEntity.UserId} updated")),
                It.IsAny<Exception>(),
                It.IsAny<Func<It.IsAnyType, Exception, string>>()!),
            Times.Never);
    }

    [Fact]
    public async Task GetAsync_Failed()
    {
        // arrange
        var testName = "testName";

        // act
        var result = await _cacheService.GetAsync<string>(testName);

        // assert
        result.Should().BeNull();
    }

    [Fact]
    public async Task GetAsync_Success()
    {
        // arrange
        var data = "data";

        _jsonSerializer.Setup(x => x.Deserialize<string>(It.IsAny<string>())).Returns(data);

        _redisDataBase.Setup(expression: x => x.StringGetAsync(
                It.IsAny<RedisKey>(),
                It.IsAny<CommandFlags>()))
            .ReturnsAsync(data);

        // act
        var result = await _cacheService.GetAsync<string>(data);

        // assert
        result.Should().Be(data);
    }
}
