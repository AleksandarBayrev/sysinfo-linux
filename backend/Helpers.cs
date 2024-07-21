using System.Diagnostics;

namespace SysInfoLinux
{
    public static class Helpers
    {
        public static async Task<ApiResponse> GetResponse(string pathToCommand)
		{
			var response = "";
			var commandExists = true;
			try
			{
				var process = new Process();
				process.StartInfo.FileName = pathToCommand;
				process.StartInfo.RedirectStandardOutput = true;
				process.Start();
				response = await process.StandardOutput.ReadToEndAsync();
			}
			catch (Exception)
			{
				response = "";
				commandExists = false;
			}
			return new ApiResponse()
			{
				Command = pathToCommand,
				Response = response,
				CommandExists = commandExists
			};
		}
    }
}