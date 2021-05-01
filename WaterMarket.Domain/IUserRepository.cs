using System;
using System.Collections.Generic;
using System.Text;
using WaterMarket.Domain.Models;

namespace WaterMarket.Domain
{
    public interface IUserRepository : IRepository<User>
    {
        User RetrieveByUsername(string username, string password);
    }
}
