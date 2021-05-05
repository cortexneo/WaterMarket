using System;
using WaterMarket.Domain.Models;

namespace WaterMarket.Domain
{
    public interface IUserRepository
    {
        User RetrieveUser(string username, string password);

        User RetrieveUserByUsername(string username);

        void UpdateUserLogin(Guid userID, string password);
    }
}
