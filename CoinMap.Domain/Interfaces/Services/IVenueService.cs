using CoinMap.Domain.Entities;
using CoinMap.Domain.Entities.Account;

namespace CoinMap.Domain.Interfaces.Services
{
    public interface IVenueService
    {
        Task<List<VenueCategory>> GetCategories();

        Task<List<Venue>> GetVenuesByCategory(string categoryName);

        Task AddFavoriteVenue(Venue venue, User user);
    }
}
