namespace API.ErrorTypes
{
    public class ApiExceptionType(string message, int statusCode, string details)
    {
        public string Message { get; set; } = message;
        public int StatusCode { get; set; } = statusCode;
        public string? Details { get; set; } = details; // only for development mode
    }
}
