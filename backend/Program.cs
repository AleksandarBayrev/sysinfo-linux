using System.Diagnostics;
using SysInfoLinux;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/commands", async () =>
{
    var responses = new List<ApiResponse>();
    var response = "";
    var commandExists = true;
    try {
        response = await Helpers.GetResponse("/usr/bin/sensors");
    } catch (Exception) {
        response = "";
        commandExists = false;
    }
    return new ApiResponse
    {
        Command
        Response = response,
        CommandExists = commandExists
    };
})
.WithName("Commands")
.WithOpenApi();

app.Run();