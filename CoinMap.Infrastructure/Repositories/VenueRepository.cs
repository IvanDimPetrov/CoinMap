using CoinMap.Domain.Entities;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Infrastructure.Context;

namespace CoinMap.Infrastructure.Repositories
{
    internal class VenueRepository : IVenueRepository
    {
        private readonly CoinMapContext _context;

        public VenueRepository(CoinMapContext context)
        {
            _context = context;
        }

        public async Task AddFavoriteVenue(Venue venue, int userId)
        {
            await _context.FavoriteVenues.AddAsync(new FavoriteVenues()
            {
                Venue = venue,
                UserId = userId
            });

            await _context.SaveChangesAsync();  
        }
    }
}
