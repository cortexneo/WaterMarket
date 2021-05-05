using System;
using System.Collections.Generic;
using WaterMarket.Domain.Models;

namespace WaterMarket.Domain
{
    public interface ICustomerRepository
    {
        Customer CreateCustomer(Customer customer);

        IEnumerable<Customer> RetrieveAllCustomer();

        Customer UpdateCustomer(Guid customerID, Customer customer);

        void DeleteCustomer(Guid customerID);
    }
}
