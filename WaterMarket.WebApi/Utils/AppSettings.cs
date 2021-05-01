using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterMarket.WebApi.Utils
{
    public class AppSettings
    {
        public _ConnectionStrings ConnectionStrings { get; set; }
        public class _ConnectionStrings
        {
            public string DefaultConnection { get; set; }
        }
    }
}
