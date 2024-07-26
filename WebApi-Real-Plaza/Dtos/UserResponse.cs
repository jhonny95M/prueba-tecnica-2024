namespace WebApi_Real_Plaza.Dtos;

public class UserResponse
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public DateTime DateOfBirth { get; set; } 
    
    public bool IsActive { get; set; } = true;
    public string RoleName { get; set; }
    public int RoleId { get; set; }

}
