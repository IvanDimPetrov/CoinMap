using CoinMap.Infrastructure.Services.Cache.Interfaces;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CoinMap.Infrastructure.Services.Cache
{
    public class CacheService : ICacheService
    {
        private readonly IDatabase _redis;

        public CacheService(IConnectionMultiplexer muxer)
        {
            _redis = muxer.GetDatabase();
        }

        public Task<bool> ExistsAsync(string key)
        {
            throw new NotImplementedException();
        }

        public async Task<T?> GetAsync<T>(string key)
        {
            var data = await _redis.StringGetAsync(key);

            var result = JsonConvert.DeserializeObject<T>(data!);

            return result!;
        }

        public Task RemoveAsync(string key)
        {
            throw new NotImplementedException();
        }

        public Task SetAsync<T>(string key, T value)
        {
            throw new NotImplementedException();
        }
    }
}
