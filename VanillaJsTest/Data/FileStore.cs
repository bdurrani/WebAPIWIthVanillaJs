namespace VanillaJsTest.Data;

public interface IFileStore
{
    Task<string> SaveFile(Stream fileStream);
    string GetFilePath(string fileId);
}

public class FileStore : IFileStore
{
    private readonly ILogger<FileStore> _logger;
    private readonly string _storagePath;

    public FileStore(ILogger<FileStore> logger, IWebHostEnvironment webHostEnvironment)
    {
        _logger = logger;
        _storagePath = Path.Combine(webHostEnvironment.ContentRootPath, "raw_uploads");
        if (!Directory.Exists(_storagePath))
        {
            Directory.CreateDirectory(_storagePath);
        }
    }

    /// <summary>
    /// Get the fully qualified path to the file saved to disk
    /// </summary>
    /// <param name="fileId">name of file</param>
    /// <returns>Fully qualified path to file on disk</returns>
    public string GetFilePath(string fileId)
    {
        return Path.Combine(_storagePath, fileId);
    }

    /// <summary>
    /// Save the file to a temp location
    /// </summary>
    /// <param name="fileStream">stream to save to disk</param>
    /// <returns>Name of the file saved to disk</returns>
    public async Task<string> SaveFile(Stream fileStream)
    {
        var safeFileName = Guid.NewGuid().ToString();
        var path = Path.Combine(_storagePath, safeFileName);
        await using FileStream fs = new(path, FileMode.Create);
        await fileStream.CopyToAsync(fs);
        _logger.LogInformation("Saving stream to Path {Path}", path);
        return safeFileName;
    }
}
