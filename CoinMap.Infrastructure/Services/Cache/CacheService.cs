using CoinMap.Domain.Entities.Venue;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CoinMap.Infrastructure.Services.Cache
{
    public class CacheService
    {
        private readonly IDatabase _redis;

        public CacheService(IConnectionMultiplexer muxer)
        {
            _redis = muxer.GetDatabase();
        }
        public async Task<T> GetDataByKeyAsync<T>(string key)
        {

            var data = await _redis.StringGetAsync(key);

            var result = JsonConvert.DeserializeObject<T>(data!);

            return result!;
        }
    }
}
