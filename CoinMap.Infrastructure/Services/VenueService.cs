using CoinMap.Domain.Entities.Category;
using CoinMap.Domain.Interfaces.Services;
using CoinMap.Infrastructure.Services.Cache;

namespace CoinMap.Infrastructure.Services
{
    public class VenueService : IVenueService
    {
        private readonly CacheService _cacheService;

        public VenueService(CacheService cacheService)
        {
            _cacheService = cacheService;
        }

        public async Task<List<Category>> GetCategories()
        {
            var categories = await _cacheService.GetDataByKey<List<Category>>(Constants.REDIS_CATEGORIES_KEY);

            return categories;
        }
    }
}
