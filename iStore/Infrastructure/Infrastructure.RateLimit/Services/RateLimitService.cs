using Infrastructure.RateLimit.Extensions;
using Infrastructure.RateLimit.Services.Interfaces;

namespace Infrastructure.RateLimit.Services;

public class RateLimitService : IRateLimitService
{
    private readonly IRateLimitCache _cache;

    private readonly RateLimitConfig _config;

    public RateLimitService(IRateLimitCache cache, IOptions<RateLimitConfig> options)
    {
        _cache = cache;
        _config = options.Value;
    }

    public async Task<bool> IsExceededAsync(HttpContext context)
    {
        var requestCount = await _cache.IncrementAsync(context.GetRateLimitKey());
        return requestCount > _config.MaxRequestCount;
    }
}
