using Infrastructure.RateLimit.Services.Interfaces;

namespace Infrastructure.RateLimit.Services;

internal class RateLimitCache : IRateLimitCache
{
    private const long INITVALUE = 1;

    private readonly RateLimitConfig _config;

    private readonly IRedisCacheConnectionService _redisCacheConnectionService;

    public RateLimitCache(IRedisCacheConnectionService redisCacheConnectionService, IOptions<RateLimitConfig> options)
    {
        _redisCacheConnectionService = redisCacheConnectionService;
        _config = options.Value;
    }

    public async Task<long> IncrementAsync(string key)
    {
        var redis = GetRedisDatabase();

        if (!await redis.KeyExistsAsync(key))
        {
            await redis.StringSetAsync(key, INITVALUE, _config.CacheTimeout);

            return INITVALUE;
        }

        return await redis.StringIncrementAsync(key);
    }

    private IDatabase GetRedisDatabase()
    {
        return _redisCacheConnectionService.Connection.GetDatabase(_config.RedisDatabaseIndex);
    }
}
