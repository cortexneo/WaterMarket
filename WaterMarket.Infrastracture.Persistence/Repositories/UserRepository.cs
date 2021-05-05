using System;
using System.Linq;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using WaterMarket.Persistence;

namespace WaterMarket.Infrastracture.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected WaterMarketContext context;

        public UserRepository(WaterMarketContext context)
        {
            this.context = context;
        }

        public User RetrieveUser(string username, string password)
        {
            return context.Set<User>().Where(x => x.Username == username && x.Password == password).FirstOrDefault();
        }

        public User RetrieveUserByUsername(string username)
        {
            return context.Set<User>().Where(x => x.Username == username).FirstOrDefault();
        }

        public void UpdateUserLogin(Guid userID, string password)
        {
            var userToUpdate = context.Set<User>().Find(userID);

            if (userToUpdate != null)
            {
                userToUpdate.Password = password;

                context.Entry<User>(userToUpdate)
                    .CurrentValues
                    .SetValues(userToUpdate);

                context.SaveChanges();
            }
        }
    }
}
