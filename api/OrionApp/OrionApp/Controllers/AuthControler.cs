using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionApp.Data;
using OrionApp.Dtos;
using OrionApp.Models;

namespace OrionApp.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthControler : Controller
    {
        private readonly IUserRepository repository;

        public AuthControler(IUserRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)

            };

            return Created("success", this.repository.Create(user));

        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = repository.GetByEmail(dto.Email);

            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            } 

            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            return Ok(user);

        }
    }
}
