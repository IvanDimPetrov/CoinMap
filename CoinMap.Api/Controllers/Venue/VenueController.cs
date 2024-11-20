using CoinMap.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace CoinMap.Api.Controllers.Venue
{
    [Route("api/[controller]")]
    [ApiController]
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
            return Ok(await _venueService.GetCategories());
        }
    }
}
