using CoinMap.Domain.Entities;
using CoinMap.Domain.Entities.Account;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinMap.Infrastructure.Context.FluentApi
{
    internal class VenueFluentApi : IEntityTypeConfiguration<Venue>
    {
        public void Configure(EntityTypeBuilder<Venue> builder)
        {
            builder.Property(x => x.Id).ValueGeneratedNever();
        }
    }
}
