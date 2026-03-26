using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task<bool> SaveAllAsync();
        Task<IReadOnlyList<Member>> GetMembersAsync(string currentUserId);
        Task<Member?> GetMemberByIDAsync(string id);
        Task<IReadOnlyList<Image>> GetImagesAsync(string id);

        Task<Member?> GetMemberForUpdates(string id); 
    }
}
