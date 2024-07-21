namespace SysInfoLinux.Services
{
    public interface ICommandExecutor
    {
        void Start();
        void Stop();
        IDictionary<string, ApiResponse> Responses { get; }
    }
}