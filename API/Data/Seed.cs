using System.Security.Cryptography;
using API.DTO;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(AppDbContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var members = System.Text.Json.JsonSerializer.Deserialize<List<SeedUserDTO>>(userData);

            if (members == null)
            {
                Console.WriteLine("No users found in the seed data.");
                return;
            }


            foreach (var member in members)
            {
                using var hmac = new HMACSHA512();

                var user = new User
                {
                    Id = member.Id,
                    DisplayName = member.DisplayName,
                    Email = member.Email,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        BirthDate = member.BirthDate,
                        City = member.City,
                        Country = member.Country,
                        Created = member.Created,
                        LastActive = member.LastActive,
                        Description = member.Description,
                        ImageUrl = member.ImageUrl,
                        DisplayName = member.DisplayName,
                    }
                };

                user.Member.Images.Add(new Image
                {
                    Url = member.ImageUrl!,
                    MemberID = member.Id
                });

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}
