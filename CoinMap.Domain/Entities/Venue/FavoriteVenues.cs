using CoinMap.Domain.Entities.Account;

namespace CoinMap.Domain.Entities
{
    public class FavoriteVenues
    {
        public int Id { get; set; }
        public int VenueId { get; set; }
        public Venue Venue { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
