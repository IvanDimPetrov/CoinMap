using CoinMap.Domain.Entities.Account;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Domain.Interfaces.Services;

namespace CoinMap.Infrastructure.Services
{
    internal class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Register(User user)
        {
            try
            {
                await _userRepository.AddAsync(user);

                if (user != null)
                {

                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
            
        }

        public async Task<User?> Login(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user != null && password == user.Password) 
            {
                return user;
            }

            return null;
        }
    }
}
