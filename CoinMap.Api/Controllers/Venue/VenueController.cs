using CoinMap.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoinMap.Api.Controllers.Venue
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VenueController : ControllerBase
    {
        private readonly IVenueService _venueService;

        public VenueController(IVenueService venueService)
        {
            _venueService = venueService;
        }

        [HttpGet("categories")]
        public async Task<ActionResult> GetCategories()
        {
            var categories = await _venueService.GetCategories();
            return Ok(categories);
        }

        [HttpGet("venues/{category}/{page}")]
        public async Task<ActionResult> GetVenuesByCategory(string category, int page)
        {
            var venues = (await _venueService.GetVenuesByCategory(category)).Take(page * 20);
            return Ok(venues);
        }
    }
}
