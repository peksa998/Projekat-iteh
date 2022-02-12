using OrionApp.Models;

namespace OrionApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext context;

        public UserRepository(UserContext context)
        {
            this.context = context;
        }
        public User Create(User user)
        {
           this.context.Users.Add(user);
           user.Id = this.context.SaveChanges();

            return user;
        }

        public User GetByEmail(string email)
        {
            return context.Users.FirstOrDefault(x => x.Email == email);
        }
    }
}
