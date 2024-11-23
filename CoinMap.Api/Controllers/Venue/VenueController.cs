using CoinMap.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoinMap.Api.Controllers.Venue
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VenuesController : ControllerBase
    {
        private readonly IVenueService _venueService;

        public VenuesController(IVenueService venueService)
        {
            _venueService = venueService;
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
    }
}
