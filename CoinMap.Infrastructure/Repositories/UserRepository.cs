using CoinMap.Domain.Entities.Account;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinMap.Infrastructure.Repositories
{
    internal class UserRepository : IUserRepository
    {
        private readonly CoinMapContext _context;

        public UserRepository(CoinMapContext context)
        {
            _context = context;
        }
        public async Task<User> AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }
    }
}
