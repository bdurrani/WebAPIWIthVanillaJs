using Microsoft.Extensions.FileProviders;
using VanillaJsTest.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ImageGenerator>();
builder.Services.AddSingleton<IFileStore, FileStore>();

SetupLocalDownloadDirectories(builder.Environment);
var app = builder.Build();

var imagesPath = Path.Combine(builder.Environment.ContentRootPath, "raw_uploads", "output");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesPath),
    RequestPath = "/StaticFiles"
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpLogging();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

// app.MapFallbackToFile("index.html");
app.Run();

void SetupLocalDownloadDirectories(IWebHostEnvironment environment)
{
    var downloadPath = Path.Combine(environment.ContentRootPath, "raw_uploads");
    if (!Directory.Exists(downloadPath))
    {
        Directory.CreateDirectory(downloadPath);
    }

    var imagesPath = Path.Combine(downloadPath, "output");
    if (!Directory.Exists(imagesPath))
    {
        Directory.CreateDirectory(imagesPath);
    }
}
