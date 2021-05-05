using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;

namespace WaterMarket.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<Order> Get()
        {
            return Ok(_orderRepository.RetrieveOrder());
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public ActionResult CreateOrder([FromBody] Order order)
        {
            try
            {
                var result = _orderRepository.CreateOrder(order);
                return Ok(result);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
