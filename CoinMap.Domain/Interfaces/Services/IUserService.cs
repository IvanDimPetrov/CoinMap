using CoinMap.Domain.Entities.Account;

namespace CoinMap.Domain.Interfaces.Services
{
    public interface IUserService
    {
        Task<bool> Register(User user);

        Task<User?> Login(string email, string password);
    }
}
