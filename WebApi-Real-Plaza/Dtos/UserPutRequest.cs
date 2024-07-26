namespace WebApi_Real_Plaza.Dtos
{
    public class UserPutRequest
    {
        public int Id { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int RoleId { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
