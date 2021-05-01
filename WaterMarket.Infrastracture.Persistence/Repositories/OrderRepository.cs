using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using WaterMarket.Persistence;
using WaterMarket.Persistence.Repositories.Base;

namespace WaterMarket.Infrastracture.Persistence.Repositories
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {
        public OrderRepository(WaterMarketContext context) : base(context)
        {
        }
    }
}
