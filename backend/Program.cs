using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using SysInfoLinux;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var commands = builder.Configuration.GetSection("Commands").Get<string[]>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    RequestPath = "/static",
    FileProvider = new PhysicalFileProvider(Path.Join(Directory.GetCurrentDirectory(), "static"))
});

app.MapGet("/", async () =>
{
    return await File.ReadAllLinesAsync(Path.Join(Directory.GetCurrentDirectory(), "index.html"));
});
app.MapGet("/commands", async () =>
{
    var responses = new List<ApiResponse>();
    foreach (var command in commands ?? Enumerable.Empty<string>())
    {
        responses.Add(await Helpers.GetResponse(command));
    }
    return responses;
})
.WithName("Commands")
.WithOpenApi();

app.Run();