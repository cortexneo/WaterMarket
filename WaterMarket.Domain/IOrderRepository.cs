using System.Linq;
using WaterMarket.Domain.Models;

namespace WaterMarket.Domain
{
    public interface IOrderRepository
    {
        IQueryable<Order> RetrieveOrder();

        Order CreateOrder(Order order);
    }
}
