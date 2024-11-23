using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Domain.Interfaces.Services;
using CoinMap.Infrastructure.Context;
using CoinMap.Infrastructure.Repositories;
using CoinMap.Infrastructure.Services;
using CoinMap.Infrastructure.Services.Cache;
using CoinMap.Infrastructure.Services.Cache.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Reflection;
using System.Text;

namespace CoinMap.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCoinMapDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<CoinMapContext>(options => options.UseSqlServer(
            connectionString, x => x.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName)));
        }

        public static void AddIdentityPolicy(this IServiceCollection services)
        {
            //services.AddIdentity<User, Role>(options =>
            //{
            //    options.Password.RequiredLength = 3;
            //    options.Password.RequireNonAlphanumeric = false;
            //    options.Password.RequireDigit = false;
            //    options.Password.RequireUppercase = false;
            //    options.Password.RequireLowercase = false;
            //})
            ////.AddEntityFrameworkStores<CoinMapContext>()
            //.AddDefaultTokenProviders();
        }

        public static void AddAuthenticationWithJWTTokenPolicy(this IServiceCollection services, string issuer, string key)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!))
                };
            });
        }

        public static void AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect("localhost"));
            services.AddHostedService<GetApiDataHostedService>();
            services.AddHttpClient();
            services.AddScoped<ICacheService, CacheService>();
            services.AddScoped<IVenueService, VenueService>();
            services.AddScoped<IVenueRepository, VenueRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>(); 
        }
    }
}
