using System.Net;
using System.Text.Json;
using API.ErrorTypes;

namespace API.MiddleWare
{
    public class ExeptionMiddleWare(
        RequestDelegate next,
        ILogger<ExeptionMiddleWare> logger,
        IHostEnvironment env)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "{message}", ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = env.IsDevelopment()
                    ? new ApiExeptionType(ex.Message, context.Response.StatusCode,  ex.StackTrace)
                    : new ApiExeptionType(ex.Message, context.Response.StatusCode, "Internal server error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
