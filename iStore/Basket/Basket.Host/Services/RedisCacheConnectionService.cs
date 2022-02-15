using Basket.Host.Configurations;
using Basket.Host.Services.Interfaces;

namespace Basket.Host.Services;

public class RedisCacheConnectionService : IRedisCacheConnectionService, IDisposable
{
    private readonly Lazy<ConnectionMultiplexer> _connectionLazy;

    private bool _disposed;

    public RedisCacheConnectionService(
        IOptions<RedisConfig> config)
    {
        var redisConfigurationOptions = ConfigurationOptions.Parse(config.Value.Host);
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
