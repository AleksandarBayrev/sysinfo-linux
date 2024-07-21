using System.Collections.Concurrent;

namespace SysInfoLinux.Services
{
    public class FileCacher : IFileCacher
    {
        private readonly ConcurrentDictionary<string, byte[]> _data;

        public FileCacher()
        {
            _data = new ConcurrentDictionary<string, byte[]>();
        }

        public void Add(string key, byte[] value)
        {
            var result = _data.TryAdd(key, value);
            if (!result)
            {
                throw new Exception($"Failed to cache {key}");
            }
        }

        public byte[] Get(string key)
        {
            var item = _data.TryGetValue(key, out var result) ? result : null;
            if (item == null)
            {
                throw new Exception($"{key} does not exist!");
            }
            return item;
        }
    }
}