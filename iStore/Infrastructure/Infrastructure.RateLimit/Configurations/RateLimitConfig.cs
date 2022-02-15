namespace Basket.Host.Configurations;

public class RateLimitConfig
{
    public TimeSpan CacheTimeout { get; set; } = TimeSpan.FromMinutes(1);

    public int MaxRequestCount { get; set; } = 10;

    public int RedisDatabaseIndex { get; set; } = -1;

    public string RedisHost { get; set; } = null!;
}
