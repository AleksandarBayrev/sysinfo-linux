namespace SysInfoLinux.Services
{
    public interface IFileCacher
    {

        public void Add(string key, byte[] value);
        public byte[] Get(string key);
    }
}