using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;
using SysInfoLinux;
using SysInfoLinux.Middlewares;
using SysInfoLinux.Services;
namespace SysInfoLinux
{
    public static class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSingleton<IFileCacher, FileCacher>();
            builder.Services.AddSingleton<RequestMiddleware>();
            var commands = builder.Configuration.GetSection("Commands").Get<string[]>();

            var app = builder.Build();
            var fileCacher = app.Services.GetRequiredService<IFileCacher>();
            fileCacher.Add(Constants.FRONTEND_HTML_KEY, File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), app.Configuration.GetSection("HTMLRelativePath").Get<string>())));
            fileCacher.Add(Constants.FAVICON_KEY, File.ReadAllBytes(Path.Combine(Directory.GetCurrentDirectory(), app.Configuration.GetSection("FaviconRelativePath").Get<string>())));

            app.MapControllers();   
            app.UseStaticFiles(new StaticFileOptions
            {
                RequestPath = "/static",
                FileProvider = new PhysicalFileProvider(Path.Join(Directory.GetCurrentDirectory(), "static"))
            });
            app.UseMiddleware<RequestMiddleware>();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.Run();
        }
    }

}