using CoinMap.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinMap.Domain.Interfaces.Repositories
{
    public interface IVenueRepository
    {
        Task AddFavoriteVenue(Venue venue, int userId);
    }
}
