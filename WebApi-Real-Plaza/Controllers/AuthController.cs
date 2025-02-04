﻿using Microsoft.AspNetCore.Mvc;
using WebApi_Real_Plaza.Dtos;
using WebApi_Real_Plaza.Interfaces;

namespace WebApi_Real_Plaza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthSecurity authSecurity;

        public AuthController(IAuthSecurity authSecurity)
        {
            this.authSecurity = authSecurity;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var user = await authSecurity.Authenticate(loginRequest.Username, loginRequest.Password);
            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var token = authSecurity.GenerateJwtToken(user);
            return Ok(new { token });
        }
    }
}
