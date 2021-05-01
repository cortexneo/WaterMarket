using System;

namespace WaterMarket.Domain.Models
{
    public class Order
    {
        public Order()
        {
            OrderID = Guid.NewGuid();
            PurchasedDate = DateTime.UtcNow;
        }

        public Guid OrderID { get; set; }

        public string OrderedProducts { get; set; }

        public DateTime PurchasedDate { get; set; }

        public double Amount { get; set; }
    }
}
