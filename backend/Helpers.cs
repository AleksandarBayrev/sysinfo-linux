using System.Diagnostics;

namespace SysInfoLinux
{
    public static class Helpers
    {
        public static async Task<string> GetResponse(string pathToCommand)
        {
            var process = new Process();
            process.StartInfo.FileName = pathToCommand;
            process.StartInfo.RedirectStandardOutput = true;
            process.Start();
            return await process.StandardOutput.ReadToEndAsync();
        }
    }
}