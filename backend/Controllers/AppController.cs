using Microsoft.AspNetCore.Mvc;
using SysInfoLinux.Services;

namespace SysInfoLinux.Controllers
{
    [Route("/")]
    [ApiController]
    public class AppController
    {
        private readonly IFileCacher _fileCacher;
        private readonly ICommandExecutor _commandExecutor;
        private readonly IConfiguration _configuration;

        public AppController(
            IFileCacher fileCacher,
            ICommandExecutor commandExecutor,
            IConfiguration configuration)
        {
            _fileCacher = fileCacher;
            _commandExecutor = commandExecutor;
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
        public Task<IEnumerable<ApiResponse>> GetCommandResults()
        {            
            return Task.FromResult(_commandExecutor.Responses.Values.AsEnumerable());
        }
    }
}