using System.Collections.Generic;
using WaterMarket.Domain.Models;

namespace WaterMarket.Domain
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        IEnumerable<Customer> RetrieveAllCustomer();
    }
}
