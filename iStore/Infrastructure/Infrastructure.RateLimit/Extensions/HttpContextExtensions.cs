namespace Infrastructure.RateLimit.Extensions;

internal static class HttpContextExtensions
{
    public static string GetRateLimitKey(this HttpContext context)
    {
        return context.Connection.RemoteIpAddress.ToString() + context.Request.Path;
    }
}
