using CoinMap.Domain.Entities;
using CoinMap.Domain.Entities.Account;
using CoinMap.Infrastructure.Context.FluentApi;
using Microsoft.EntityFrameworkCore;

namespace CoinMap.Infrastructure.Context
{
    internal class CoinMapContext : DbContext
    {
        public CoinMapContext(DbContextOptions<CoinMapContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<FavoriteVenues> FavoriteVenues { get; set;}

        public DbSet<Venue> Venues { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new UserFluentApi());
            builder.ApplyConfiguration(new VenueFluentApi());
        }
    }
}
