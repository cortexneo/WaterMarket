﻿using Microsoft.EntityFrameworkCore;
using WaterMarket.Domain.Models;

namespace WaterMarket.Persistence
{
    public class WaterMarketContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }

        public WaterMarketContext(DbContextOptions<WaterMarketContext> options) : base(options)
        {

        }
    }
}
