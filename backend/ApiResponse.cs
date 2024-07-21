namespace SysInfoLinux
{    
    public struct ApiResponse
    {
        public string Command { get;set; }
        public string Response { get; set; }
        public bool CommandExists { get; set; }
    }
}