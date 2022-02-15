namespace Infrastructure.RateLimit;

internal static class Error
{
    public static string ContentType { get; } = "application/problem+json";

    public static ProblemDetails LimitExceededProblemDetails { get; } = new ProblemDetails { Title = "Rate limit exceeded" };
}
