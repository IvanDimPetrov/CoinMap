using CoinMap.Domain.Entities.Category;
using CoinMap.Domain.Entities.Venue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinMap.Domain.Interfaces.Services
{
    public interface IVenueService
    {
        Task<List<Category>> GetCategories();

        Task<List<Venue>> GetVenuesByCategory(string categoryName);
    }
}
