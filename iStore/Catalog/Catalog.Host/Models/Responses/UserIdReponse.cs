namespace Catalog.Host.Models.Responses;

public class UserIdResponse<T>
{
    public T Id { get; set; } = default!;
}
