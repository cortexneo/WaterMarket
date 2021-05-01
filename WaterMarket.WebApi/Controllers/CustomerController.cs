using Microsoft.AspNetCore.Mvc;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WaterMarket.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository ?? throw new ArgumentNullException(nameof(customerRepository));
        }


        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<IEnumerable<Customer>> Get()
        {
            return Ok(_customerRepository.RetrieveAllCustomer().OrderBy(x => x.DateCreated));
        }


        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public ActionResult CreateCustomer([FromBody] Customer customer)
        {
            try
            {
                var result = _customerRepository.Create(customer);
                return Ok(result);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public ActionResult UpdateCustomer(Guid customerID, Guid orderID)
        {
            var customerRecord = _customerRepository.Retrieve(customerID);
            if (customerRecord == null) return NotFound();
            customerRecord.OrderID = orderID;

            try
            {
                var result = _customerRepository.Update(customerID, customerRecord);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
