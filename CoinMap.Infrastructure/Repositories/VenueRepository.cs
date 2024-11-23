using CoinMap.Domain.Entities;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<Venue>> GetFavoriteVenues(int userId)
        {
            return await _context.FavoriteVenues
                            .Include(x => x.Venue)
                            .Where(x => x.UserId == userId)
                            .Select(x => x.Venue)
                            .ToListAsync();
        }
    }
}
