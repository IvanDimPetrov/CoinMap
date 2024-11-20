using CoinMap.Domain.Entities.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinMap.Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);

        Task<User?> GetUserByEmailAsync(string email);
    }
}
