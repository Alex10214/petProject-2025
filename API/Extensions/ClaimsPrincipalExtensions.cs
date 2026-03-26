using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        /// <summary>
        /// Retrieves the member ID from the JWT claims (NameIdentifier).
        /// Throws an exception if the claim is not found.
        /// </summary>
        public static string GetMemberId(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new Exception("Cannot find user id in claims");
        }
    }
}
