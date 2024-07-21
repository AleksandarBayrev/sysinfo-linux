namespace SysInfoLinux.Exceptions
{
    public class RouteNotFoundException : Exception
    {
        public string Route { get; init; }
        public RouteNotFoundException(string route) : base($"Route not found: {route}")
        {
            Route = route;
        }
    }
}