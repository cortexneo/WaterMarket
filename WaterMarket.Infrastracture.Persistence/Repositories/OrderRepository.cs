using System.Linq;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using WaterMarket.Persistence;

namespace WaterMarket.Infrastracture.Persistence.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        protected WaterMarketContext context;

        public OrderRepository(WaterMarketContext context)
        {
            this.context = context;
        }

        public IQueryable<Order> RetrieveOrder()
        {
            return context.Set<Order>();
        }

        public Order CreateOrder(Order order)
        {
            context.Set<Order>()
                   .Add(order);
            context.SaveChanges();
            return order;
        }
    }
}
