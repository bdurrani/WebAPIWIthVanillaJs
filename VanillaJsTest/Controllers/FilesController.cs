using Microsoft.AspNetCore.Mvc;

namespace VanillaJsTest.Controllers;

using Data;

[ApiController]
[Route("[controller]")]
public class FilesController : Controller
{
    private readonly ILogger<FilesController> _logger;
    private readonly IFileStore _fileStore;

    public FilesController(ILogger<FilesController> logger, IFileStore fileStore)
    {
        _logger = logger;
        _fileStore = fileStore;
    }

    [HttpPost]
    public async Task<IActionResult> PostExtractionJob(IFormFile file)
    {
       using var memoryStream = new MemoryStream();
       await file.OpenReadStream().CopyToAsync(memoryStream);
       var data = Convert.ToBase64String(memoryStream.GetBuffer());
       var filename = await _fileStore.SaveFile(file.OpenReadStream());
       _logger.LogInformation("Got an upload {Name} {LocalFileName}", file.FileName, filename);
       return Ok(data);
    }
}
