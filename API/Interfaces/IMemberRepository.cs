using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task<bool> SaveAllAsync();
        Task<IReadOnlyList<Member>> GetMembersAsync();
        Task<Member?> GetMemberByIDAsync(string id);
        Task<IReadOnlyList<Image>> GetImageAsync(string id);

        Task<Member?> GetMemberForUpdates(string id); 
    }
}
