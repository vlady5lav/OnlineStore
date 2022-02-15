using Basket.Host.Models;
using Basket.Host.Services.Interfaces;

namespace Basket.Host.Services;

public class BasketService : IBasketService
{
    private readonly ICacheService _cacheService;

    public BasketService(
        ICacheService cacheService)
    {
        _cacheService = cacheService;
    }

    public async Task Update(string userId, string data)
    {
        await _cacheService.AddOrUpdateAsync(userId, data);
    }

    public async Task<GetBasketResponse> Get(string userId)
    {
        var result = await _cacheService.GetAsync<string>(userId);
        return new GetBasketResponse() { Data = result };
    }

    public Task Remove(string userId)
    {
        throw new NotImplementedException();
    }
}
