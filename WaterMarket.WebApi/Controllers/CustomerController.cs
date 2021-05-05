using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WaterMarket.Domain;
using WaterMarket.Domain.Models;

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
                var result = _customerRepository.CreateCustomer(customer);
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
        public ActionResult UpdateCustomer(Guid customerID, Customer customer)
        {
            try
            {
                var result = _customerRepository.UpdateCustomer(customerID, customer);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public ActionResult DeleteCustomer(Guid customerID)
        {
            try
            {
                _customerRepository.DeleteCustomer(customerID);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
