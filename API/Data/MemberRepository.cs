using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MemberRepository(AppDbContext context) : IMemberRepository
    {
        /// <summary>
        /// Retrieves all images associated with a specific member.
        /// </summary>
        /// <param name="memberID">Member identifier.</param>
        /// <returns>Read-only list of member images.</returns>
        public async Task<IReadOnlyList<Image>> GetImageAsync(string memberID)
        {
            return await context.Members
                .Where(m => m.Id == memberID)
                .SelectMany(m => m.Images)
                .ToListAsync();
        }

        /// <summary>
        /// Retrieves all members from the data store.
        /// </summary>
        public async Task<IReadOnlyList<Member>> GetMembersAsync()
        {
            return await context.Members.ToListAsync();
        }

        /// <summary>
        /// Retrieves a single member by its identifier.
        /// </summary>
        /// <param name="id">Member identifier.</param>
        /// <returns>Member entity or null if not found.</returns>
        public async Task<Member?> GetMemberByIDAsync(string id)
        {
            return await context.Members.FindAsync(id);
        }

        /// <summary>
        /// Persists all pending changes to the data store.
        /// </summary>
        /// <returns>True if at least one change was saved.</returns>
        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        /// <summary>
        /// Marks a member entity as modified to be updated in the data store.
        /// </summary>
        /// <param name="member">Member entity to update.</param>
        public void Update(Member member)
        {
            context.Entry(member).State = EntityState.Modified;
        }

        public async Task<Member?> GetMemberForUpdates(string id)
        {
            return await context.Members
                .Include(m => m.User)
                .Include(m => m.Images)
                .FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
