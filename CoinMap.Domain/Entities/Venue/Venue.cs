namespace CoinMap.Domain.Entities
{
    public class Venue
    {
        public int Id { get; set; }

        public double Lat { get; set; }

        public double Lon { get; set; }

        public string Category { get; set; } = string.Empty;

        public int Created_On { get; set; }

        public string Geolocation_Degrees {get; set;} = string.Empty;
    }
}
