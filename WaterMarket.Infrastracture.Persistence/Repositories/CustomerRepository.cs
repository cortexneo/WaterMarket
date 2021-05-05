using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;

namespace WaterMarket.Persistence.Repositories
{
    public class CustomerRepository :  ICustomerRepository
    {
        protected WaterMarketContext context;

        public CustomerRepository(WaterMarketContext context)
        {
            this.context = context;
        }

        public Customer CreateCustomer(Customer customer)
        {
            context.Set<Customer>()
                    .Add(customer);
            context.SaveChanges();

            return customer;
        }

        public IEnumerable<Customer> RetrieveAllCustomer()
        {
            return context.Set<Customer>()
                .Include(x => x.Order);
        }

        public Customer UpdateCustomer(Guid customerID, Customer customer)
        {
            var customerToUpdate = context.Set<Customer>()
                .Include(x => x.Order)
                .FirstOrDefault(x => x.CustomerID == customerID);

            if (customerToUpdate != null)
            {
                context.Entry<Order>(customerToUpdate.Order)
                    .CurrentValues
                    .SetValues(customer.Order);

                context.Entry<Customer>(customerToUpdate)
                       .CurrentValues
                       .SetValues(customer);

                context.SaveChanges();
            }

            return customer;
        }

        public void DeleteCustomer(Guid customerID)
        {
            var customerToRemove = context.Set<Customer>()
                .Include(x => x.Order)
                .FirstOrDefault(x => x.CustomerID == customerID);
            if (customerToRemove != null)
            {
                context.Set<Customer>().Remove(customerToRemove);
                context.Set<Order>().Remove(customerToRemove.Order);
                context.SaveChanges();
            }
        }
    }
}
