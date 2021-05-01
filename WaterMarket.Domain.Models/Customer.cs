using System;

namespace WaterMarket.Domain.Models
{
    public class Customer
    {
        public Customer()
        {
            CustomerID = Guid.NewGuid();
            DateCreated = DateTime.UtcNow;
            OrderID = Guid.Empty;
        }

        public Guid CustomerID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public DateTime DateCreated { get; set; }
        public Order Order { get; set; }
        public Guid OrderID { get; set; }
    }
}
