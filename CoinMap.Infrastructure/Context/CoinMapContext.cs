using CoinMap.Domain.Entities.Account;
using Microsoft.EntityFrameworkCore;

namespace CoinMap.Infrastructure.Context
{
    internal class CoinMapContext : DbContext
    {
        public CoinMapContext(DbContextOptions<CoinMapContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
