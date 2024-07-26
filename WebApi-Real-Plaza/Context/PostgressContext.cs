using Microsoft.EntityFrameworkCore;
using WebApi_Real_Plaza.Models;

namespace WebApi_Real_Plaza.Context
{
    public class PostgressContext:DbContext
    {
        public PostgressContext(DbContextOptions<PostgressContext>options):base(options) { }
        public DbSet<User>Users { get; set; }
        public DbSet<Role> Roles { get; set; }

    }
}
