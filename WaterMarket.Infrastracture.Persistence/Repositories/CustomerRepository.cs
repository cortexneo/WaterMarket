using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using WaterMarket.Persistence.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace WaterMarket.Persistence.Repositories
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(WaterMarketContext context) : base(context)
        {
        }

        public IEnumerable<Customer> RetrieveAllCustomer()
        {
            return context.Set<Customer>()
                .Include(x => x.Order);
        }
    }
}
