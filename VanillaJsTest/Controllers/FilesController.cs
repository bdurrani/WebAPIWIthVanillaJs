using Microsoft.AspNetCore.Mvc;

namespace VanillaJsTest.Controllers;

using Data;
using Models;

[ApiController]
[Route("[controller]")]
public class FilesController : Controller
{
    private readonly ILogger<FilesController> _logger;
    private readonly IFileStore _fileStore;
    private readonly ImageGenerator _imageGenerator;

    public FilesController(ILogger<FilesController> logger, IFileStore fileStore, ImageGenerator imageGenerator)
    {
        _logger = logger;
        _fileStore = fileStore;
        _imageGenerator = imageGenerator;
    }

    [HttpPost]
    public async Task<ActionResult<StatementData>> PostExtractionJob(IFormFile file)
    {
       using var memoryStream = new MemoryStream();
       await file.OpenReadStream().CopyToAsync(memoryStream);
       var data = Convert.ToBase64String(memoryStream.GetBuffer());
       var filename = await _fileStore.SaveFile(file.OpenReadStream());
       _logger.LogInformation("Got an upload {Name} {LocalFileName}", file.FileName, filename);
       var pathToFile = _fileStore.GetFilePath(filename);
       var images = await _imageGenerator.Generate(pathToFile);
       var statementData = new StatementData();

       var pages = images.Select(image => new PageData() { ImageData = image }).ToArray();
       statementData.Pages = pages;
       return Ok(statementData);
    }
}
