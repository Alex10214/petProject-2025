using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    /// <summary>
    /// Entity Framework Core database context used to access and manage application data.
    /// Defines database tables and handles connections, queries, and persistence.
    /// </summary>
    public class AppDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Image> Image { get; set; }
    }
}
