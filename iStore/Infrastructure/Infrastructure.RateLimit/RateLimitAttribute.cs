namespace Infrastructure.RateLimit;

public class RateLimitAttribute : TypeFilterAttribute
{
    public RateLimitAttribute()
        : base(typeof(RateLimitFilter))
    {
    }
}
