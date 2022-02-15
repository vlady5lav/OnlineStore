using Infrastructure.RateLimit.Services.Interfaces;

namespace Infrastructure.RateLimit;

public class RateLimitFilter : IAsyncResourceFilter
{
    private readonly IRateLimitService _rateLimitService;

    public RateLimitFilter(IRateLimitService rateLimitService)
    {
        _rateLimitService = rateLimitService;
    }

    public async Task OnResourceExecutionAsync(ResourceExecutingContext context, ResourceExecutionDelegate next)
    {
        if (await _rateLimitService.IsExceededAsync(context.HttpContext))
        {
            context.Result = new ObjectResult(Error.LimitExceededProblemDetails)
            {
                ContentTypes = { Error.ContentType },
                StatusCode = StatusCodes.Status429TooManyRequests,
            };

            return;
        }

        await next();
    }
}
