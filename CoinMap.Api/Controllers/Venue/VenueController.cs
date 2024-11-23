using CoinMap.Domain.Entities.Account;
using CoinMap.Domain.Interfaces.Repositories;
using CoinMap.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CoinMap.Api.Controllers.Venue
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VenuesController : ControllerBase
    {
        private readonly IVenueService _venueService;
        private readonly IUserRepository _userRepository;

        public VenuesController(
            IVenueService venueService,
            IUserRepository userRepository)
        {
            _venueService = venueService;
            _userRepository = userRepository;
        }

        [HttpGet("categories")]
        public async Task<ActionResult> GetCategories()
        {
            var categories = await _venueService.GetCategories();
            return Ok(categories);
        }

        [HttpGet("")]
        public async Task<ActionResult> GetVenuesByCategory(string category, int page, int pageSize)
        {
            var skipedItems = page == 1 ? 0 : (page - 1) * pageSize;
            var venues = (await _venueService.GetVenuesByCategory(category)).Skip(skipedItems).Take(pageSize);
            return Ok(venues);
        }

        [HttpPost("favorites")]
        public async Task<ActionResult> AddFavoriteVenue([FromBody]CoinMap.Domain.Entities.Venue venue)
        {
            var user = await GetUser();
            if (user != null)
            {
                await _venueService.AddFavoriteVenue(venue, user!);

                return Ok("Favorite Venue successfully added");
            }
            
            return Unauthorized();
        }

        [HttpGet("favorites")]
        public async Task<ActionResult> GetFavoritesVenues()
        {
            var user = await GetUser();
            if (user != null)
            {
                var result = await _venueService.GetFavoriteVenues(user!.Id);

                return Ok(result);
            }

            return Unauthorized();
        }

        private async Task<User?> GetUser()
        {
            if (HttpContext.User.Identity!.IsAuthenticated)
            {
                var userEmail = HttpContext.User!.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var user = await _userRepository.GetUserByEmailAsync(userEmail!);
                return user;
            }

            return null;
        }
    }
}
