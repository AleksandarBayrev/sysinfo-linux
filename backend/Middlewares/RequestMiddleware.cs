using Microsoft.AspNetCore.Http.Extensions;
using SysInfoLinux.Exceptions;

namespace SysInfoLinux.Middlewares
{
    public class RequestMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
                if (context.Response.StatusCode == StatusCodes.Status404NotFound)
                {
                    throw new RouteNotFoundException(new Uri(context.Request.GetDisplayUrl()).PathAndQuery);
                }
            }
            catch (Exception ex)
            {
                if (ex is RouteNotFoundException)
                {
                    var castedEx = ex as RouteNotFoundException;
                    context.Response.Redirect($"/404?path={castedEx!.Route}");
                    return;
                }
                Console.WriteLine(ex.Message);
                context.Response.Redirect("/whoops");
            }
        }
    }
}