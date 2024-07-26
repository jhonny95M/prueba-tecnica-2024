using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Real_Plaza.Models
{
    [Table(name:"users")]
    public class User
    {
        [Key]
        [Column(name:"id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(name: "username")]
        public string Username { get; set; }

        [Required]
        [MaxLength(255)]
        [Column(name: "password")]
        public string Password { get; set; }

        [Required]
        [MaxLength(100)]
        [Column(name: "email")]
        public string Email { get; set; }

        [Required]
        [Column(name: "date_of_birth")]
        public DateTime DateOfBirth { get; set; }
        [Column(name: "role_id")]
        public int RoleId { get; set; }
        //[Column(name:"roles")]
        public Role Role { get; set; }
        [Column(name: "is_active")]
        public bool IsActive { get; set; } = true;
        [Column(name: "created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        [Column(name: "updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
