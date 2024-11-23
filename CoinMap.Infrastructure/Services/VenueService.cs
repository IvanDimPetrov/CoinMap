
using CoinMap.Domain.Entities;
using CoinMap.Domain.Entities.Account;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Domain.Interfaces.Services;
using CoinMap.Infrastructure.Services.Cache.Interfaces;

namespace CoinMap.Infrastructure.Services
{
    public class VenueService : IVenueService
    {
        private readonly ICacheService _cacheService;
        private readonly IVenueRepository _venueRepository;


        public VenueService(
            ICacheService cacheService,
            IVenueRepository venueRepository)
        {
            _cacheService = cacheService;
            _venueRepository = venueRepository;
        }

        public async Task<List<VenueCategory>> GetCategories()
        {
            var categories = await _cacheService.GetAsync<List<VenueCategory>>(Constants.REDIS_CATEGORIES_KEY);

            return categories!;
        }

        public async Task<List<Venue>> GetVenuesByCategory(string categoryName)
        {
            var venues = await _cacheService.GetAsync<List<Venue>>(categoryName);

            return venues!;
        }

        public async Task AddFavoriteVenue(Venue venue, User user)
        {
            await _venueRepository.AddFavoriteVenue(venue, user.Id);
        }
    }
}
