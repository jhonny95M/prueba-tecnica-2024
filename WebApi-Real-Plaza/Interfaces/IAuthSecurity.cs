using WebApi_Real_Plaza.Models;

namespace WebApi_Real_Plaza.Interfaces;

public interface IAuthSecurity
{
    Task<User> Authenticate(string username, string password);
    string GenerateJwtToken(User user);
}
