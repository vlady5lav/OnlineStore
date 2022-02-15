namespace Infrastructure.RateLimit.Services.Interfaces;

public interface IRateLimitCache
{
    Task<long> IncrementAsync(string key);
}
