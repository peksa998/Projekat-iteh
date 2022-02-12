using Microsoft.EntityFrameworkCore;
using OrionApp.Models;

namespace OrionApp.Data
{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options): base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
        }

    }
}
