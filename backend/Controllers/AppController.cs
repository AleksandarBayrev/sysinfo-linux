using Microsoft.AspNetCore.Mvc;
using SysInfoLinux.Services;

namespace SysInfoLinux.Controllers
{
    [Route("/")]
    [ApiController]
    public class AppController
    {
        private readonly IFileCacher _fileCacher;
        private readonly IConfiguration _configuration;

        public AppController(
            IFileCacher fileCacher,
            IConfiguration configuration)
        {
            _fileCacher = fileCacher;
            _configuration = configuration;
        }

        [HttpGet("/")]
        [HttpGet("/404")]
        public Task<FileContentResult> GetHTML()
        {
            return Task.FromResult(new FileContentResult(
                fileContents: _fileCacher.Get(Constants.FRONTEND_HTML_KEY),
                contentType: Constants.FileTypes.HTML
            ));
        }

        [HttpGet("/favicon.png")]
        public Task<FileContentResult> GetFavicon()
        {
            return Task.FromResult(new FileContentResult(
                fileContents: _fileCacher.Get(Constants.FAVICON_KEY),
                contentType: Constants.FileTypes.PNG
            ));
        }

        [HttpGet("/commands")]
        public async Task<IEnumerable<ApiResponse>> GetCommandResults()
        {            
            var responses = new List<ApiResponse>();
            foreach (var command in _configuration.GetSection("Commands").GetChildren().Select(x => x.Get<string>()) ?? Enumerable.Empty<string>())
            {
                if (command != null)
                {
                    responses.Add(await Helpers.GetResponse(command));
                }
            }
            return responses;
        }
    }
}