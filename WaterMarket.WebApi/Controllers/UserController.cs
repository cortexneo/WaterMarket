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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<User> GetUser(string username, string password)
        {
            return Ok(_userRepository.RetrieveUser(username, password));
        }

        [HttpGet("GetUserByUsername")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public ActionResult<User> GetUserByUsername(string username)
        {
            return Ok(_userRepository.RetrieveUserByUsername(username));
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public ActionResult UpdateUser(Guid userID, string password)
        {
            try
            {
                _userRepository.UpdateUserLogin(userID, password);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
