using Microsoft.Extensions.FileProviders;
using SysInfoLinux.Middlewares;
using SysInfoLinux.Services;
namespace SysInfoLinux
{
    public static class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<IFileCacher, FileCacher>();
            builder.Services.AddSingleton<ICommandExecutor, CommandExecutor>();
            builder.Services.AddSingleton<RequestMiddleware>();

            var app = builder.Build();
            var fileCacher = app.Services.GetRequiredService<IFileCacher>();
            fileCacher.Add(Constants.FRONTEND_HTML_KEY, File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), app.Configuration.GetSection("HTMLRelativePath").Get<string>())));
            fileCacher.Add(Constants.FAVICON_KEY, File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), app.Configuration.GetSection("FaviconRelativePath").Get<string>())));

            var commandExecutor = app.Services.GetRequiredService<ICommandExecutor>();
            commandExecutor.Start();

            app.MapControllers();   
            app.UseStaticFiles(new StaticFileOptions
            {
                RequestPath = "/static",
                FileProvider = new PhysicalFileProvider(Path.Join(Directory.GetCurrentDirectory(), "static"))
            });
            app.UseMiddleware<RequestMiddleware>();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.Run();
        }
    }

}