namespace Infrastructure.RateLimit.Extensions;

public static class RateLimitMiddlewareExtensions
{
    public static IApplicationBuilder UseRateLimit(
        this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RateLimitMiddleware>();
    }
}
