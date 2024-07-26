using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Real_Plaza.Models
{
    [Table(name:"roles")]
    public class Role
    {
        [Key]
        [Column(name: "id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Column(name: "role_name")]
        public string RoleName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}
