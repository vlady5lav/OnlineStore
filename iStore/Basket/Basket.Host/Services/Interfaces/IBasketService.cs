using Basket.Host.Models;

namespace Basket.Host.Services.Interfaces;

public interface IBasketService
{
    Task<GetBasketResponse> Get(string userId);

    Task Update(string userId, string data);

    Task Remove(string userId);
}
