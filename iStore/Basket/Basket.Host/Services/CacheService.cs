using Basket.Host.Configurations;
using Basket.Host.Services.Interfaces;

namespace Basket.Host.Services;

public class CacheService : ICacheService
{
    private readonly RedisConfig _config;

    private readonly IJsonSerializer _jsonSerializer;

    private readonly ILogger<CacheService> _logger;

    private readonly IRedisCacheConnectionService _redisCacheConnectionService;

    public CacheService(
        ILogger<CacheService> logger,
        IRedisCacheConnectionService redisCacheConnectionService,
        IOptions<RedisConfig> config,
        IJsonSerializer jsonSerializer)
    {
        _logger = logger;
        _redisCacheConnectionService = redisCacheConnectionService;
        _jsonSerializer = jsonSerializer;
        _config = config.Value;
    }

    public Task AddOrUpdateAsync<T>(string key, T value)
    {
        return AddOrUpdateInternalAsync(key, value);
    }

    public async Task<T> GetAsync<T>(string key)
    {
        var redis = GetRedisDatabase();

        var cacheKey = GetItemCacheKey(key);

        var serialized = await redis.StringGetAsync(cacheKey);

        return serialized.HasValue ?
            _jsonSerializer.Deserialize<T>(serialized.ToString())
            : default!;
    }

    public async Task RemoveAsync(string key)
    {
        var redis = GetRedisDatabase();

        var cacheKey = GetItemCacheKey(key);

        await redis.KeyDeleteAsync(cacheKey);
    }

    private async Task AddOrUpdateInternalAsync<T>(
        string key,
        T value,
        IDatabase redis = null!,
        TimeSpan? expiry = null)
    {
        redis ??= GetRedisDatabase();
        expiry ??= _config.CacheTimeout;

        var cacheKey = GetItemCacheKey(key);
        var serialized = _jsonSerializer.Serialize(value);

        if (await redis.StringSetAsync(cacheKey, serialized, expiry))
        {
            _logger.LogInformation($"Cached value for key {key} cached");
        }
        else
        {
            _logger.LogInformation($"Cached value for key {key} updated");
        }
    }

    private string GetItemCacheKey(string userId)
    {
        return $"{userId}";
    }

    private IDatabase GetRedisDatabase()
    {
        return _redisCacheConnectionService.Connection.GetDatabase();
    }
}
