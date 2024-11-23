using CoinMap.Domain.Entities;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CoinMap.Infrastructure.Services.Cache
{
    internal class GetDataHostedService : IHostedService
    {
        private readonly HttpClient _httpClient;
        private readonly IDatabase _redis;

        public GetDataHostedService(
            HttpClient httpClient,
            IConnectionMultiplexer muxer)
        {
            _httpClient = httpClient;
            _redis = muxer.GetDatabase();
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var apiUrl = "https://coinmap.org/api/v1/venues/";

            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<ApiResponce>(responseData);

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

                Console.WriteLine(data);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

    internal class ApiResponce
    {
        public List<Venue> Venues { get; set; } = new();
    }
}
