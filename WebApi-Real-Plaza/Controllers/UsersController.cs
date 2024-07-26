using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_Real_Plaza.Context;
using WebApi_Real_Plaza.Dtos;
using WebApi_Real_Plaza.Models;

namespace WebApi_Real_Plaza.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UsersController : ControllerBase
{
    private readonly PostgressContext _context;

    public UsersController(PostgressContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserResponse>>> GetUsers()
    {
      if (_context.Users == null)
      {
          return NotFound();
      }
        var users= await _context.Users.Where(c=>c.IsActive).Select(c=>new UserResponse
        {
            DateOfBirth = c.DateOfBirth,
            Email = c.Email,
            Id = c.Id,
            IsActive = c.IsActive,
            Username=c.Username,
            RoleName=c.Role.RoleName,
            RoleId=c.RoleId
        }).ToListAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponse>> GetUser(int id)
    {
      if (_context.Users == null)
      {
          return NotFound();
      }
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return new UserResponse
        {
            DateOfBirth = user.DateOfBirth,
            Email = user.Email,
            Id = user.Id,
            IsActive = user.IsActive,
            Username = user.Username,
            RoleId=user.RoleId
        };
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, UserPutRequest userRequest)
    {
        if (id != userRequest.Id)
        {
            return BadRequest();
        }
        var user=new User 
        { 
            Id = id,
            IsActive=userRequest.IsActive,
            Email = userRequest.Email,
            DateOfBirth=userRequest.DateOfBirth,
            Password=userRequest.Password,
            RoleId=userRequest.RoleId
            
        };
        _context.Entry(user).State = EntityState.Modified;
        _context.Entry(user).Property(u => u.Username).IsModified = false;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }
    [HttpPost]
    public async Task<ActionResult<UserPostRequest>> PostUser(UserPostRequest userRequest)
    {
      if (_context.Users == null)
      {
          return Problem("Entity set 'PostgressContext.Users'  is null.");
      }
        var rol = await _context.Roles.FindAsync(userRequest.RoleId);
        if (rol == null)
        {
            return NotFound();
        }
        var user = new User()
        {
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            DateOfBirth = userRequest.DateOfBirth,
            Email=userRequest.Email,
            Password=userRequest.Password,
            Username=userRequest.Username,
            Role=rol,
            RoleId=rol.Id
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        var response = new UserResponse
        {
            DateOfBirth=user.DateOfBirth,
            Email = user.Email,
            Id=user.Id,
            IsActive=user.IsActive,
            Username=user.Username
        };

        return CreatedAtAction("GetUser", new { id = user.Id }, response);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        if (_context.Users == null)
        {
            return NotFound();
        }
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        user.IsActive = false;
        user.UpdatedAt=DateTime.UtcNow;

        _context.Entry(user).State=EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool UserExists(int id)
    {
        return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
    }
}
