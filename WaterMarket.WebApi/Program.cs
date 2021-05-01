using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace WaterMarket
{
    public class Program
    {
        private static IConfiguration _configuration;
        public static IConfiguration Configuration
        {
            get => _configuration;
            set
            {

                if (_configuration == null)
                    _configuration = value;
            }
        }

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var currentDirectory = Directory.GetCurrentDirectory();

            return Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(config =>
                {
                    config.SetBasePath(currentDirectory).AddJsonFile("appsettings.json", false, true);
                    Configuration = config.Build();
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        }
    }
}
