using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using WaterMarket.Persistence;
using WaterMarket.Persistence.Repositories.Base;

namespace WaterMarket.Infrastracture.Persistence.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(WaterMarketContext context) : base(context)
        {
        }

        public User RetrieveByUsername(string username, string password)
        {
            return context.Set<User>().Where(x => x.Username == username && x.Password == password).FirstOrDefault();
        }
    }
}
