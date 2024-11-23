using CoinMap.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CoinMap.Infrastructure.Services.Cache
{
    internal class GetApiDataHostedService : IHostedService
    {
        private readonly HttpClient _httpClient;
        private readonly IDatabase _redis;
        private readonly IConfiguration _configuration;

        public GetApiDataHostedService(
            HttpClient httpClient,
            IConnectionMultiplexer muxer,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _redis = muxer.GetDatabase();
            _configuration = configuration;

        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await PrepareCacheWithVenues();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private async Task PrepareCacheWithVenues()
        {
            var apiUrl = _configuration["ApiUrl:venuesUrl"];

            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<ApiVenuesResponce>(responseData);

                var categoryGroups = data?.Venues.GroupBy(x => x.Category);

                var categories = categoryGroups?.ToList().Select((x, i) => new VenueCategory
                {
                    Id = i + 1,
                    Name = x.Key,
                    VenuesCount = x.Count()
                });

                await _redis.StringSetAsync(Constants.REDIS_CATEGORIES_KEY, JsonConvert.SerializeObject(categories));

                foreach (var group in categoryGroups!)
                {
                    var obj = JsonConvert.SerializeObject(group);
                    await _redis.StringSetAsync(group.Key, obj);
                }
            }
        }
    }

    internal class ApiVenuesResponce
    {
        public List<Venue> Venues { get; set; } = new();
    }
}
