using Infrastructure.RateLimit.Services.Interfaces;

namespace Infrastructure.RateLimit.Services;

public class RedisCacheConnectionService : IRedisCacheConnectionService, IDisposable
{
    private readonly Lazy<ConnectionMultiplexer> _connectionLazy;

    private bool _disposed;

    public RedisCacheConnectionService(
        IOptions<RateLimitConfig> config)
    {
        var redisConfigurationOptions = ConfigurationOptions.Parse(config.Value.RedisHost);
        _connectionLazy =
            new Lazy<ConnectionMultiplexer>(()
                => ConnectionMultiplexer.Connect(redisConfigurationOptions));
    }

    public IConnectionMultiplexer Connection => _connectionLazy.Value;

    public void Dispose()
    {
        if (!_disposed)
        {
            Connection.Dispose();
            _disposed = true;
        }

        GC.SuppressFinalize(this);
    }
}
