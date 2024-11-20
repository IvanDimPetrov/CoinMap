using CoinMap.Domain.Entities.Category;
using CoinMap.Domain.Entities.Venue;
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
            var categories = await _cacheService.GetDataByKeyAsync<List<Category>>(Constants.REDIS_CATEGORIES_KEY);

            return categories;
        }

        public async Task<List<Venue>> GetVenuesByCategory(string categoryName)
        {
            var venues = await _cacheService.GetDataByKeyAsync<List<Venue>>(categoryName);

            return venues;
        }
    }
}
