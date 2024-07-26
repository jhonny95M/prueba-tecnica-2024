namespace WebApi_Real_Plaza.Models;

public class UserPostRequest
{
    public string Username { get; set; }
    
    public string Password { get; set; }

    public string Email { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int RoleId { get; set; }
}
