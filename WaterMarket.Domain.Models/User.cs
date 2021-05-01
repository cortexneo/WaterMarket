using System;

namespace WaterMarket.Domain.Models
{
    public class User
    {
        public Guid UserID { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}
