using System.Collections.Concurrent;

namespace SysInfoLinux.Services
{
    public class CommandExecutor : ICommandExecutor
    {
        private readonly IConfiguration _configuration;
        private readonly IDictionary<string, ApiResponse> _responses;
        private bool _shouldExecute = false;

        public CommandExecutor(IConfiguration configuration)
        {
            _configuration = configuration;
            _responses = new ConcurrentDictionary<string, ApiResponse>();
        }

        private async Task Execution()
        {
            while (true)
            {
                if (!_shouldExecute)
                {
                    break;
                }
                var responses = new List<ApiResponse>();
                foreach (var command in _configuration.GetSection("Commands").GetChildren().Select(x => x.Get<string>()) ?? Enumerable.Empty<string>())
                {
                    if (command != null)
                    {
                        _responses[command] = await Helpers.GetResponse(command);
                    }
                }
                await Task.Delay(500);
            }
        }

        public void Start()
        {
            _shouldExecute = true;
            this.Execution();
        }

        public void Stop()
        {
            _shouldExecute = false;
        }

        public IDictionary<string, ApiResponse> Responses => _responses;
    }
}