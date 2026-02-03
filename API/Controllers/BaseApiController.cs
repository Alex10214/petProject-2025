using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Base controller for API endpoints that provides common routing and API behavior.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : Controller
    {
        
    }
}
