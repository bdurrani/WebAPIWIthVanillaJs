namespace VanillaJsTest.Data;

using System.Diagnostics;
using HeyRed.Mime;

public class ImageGenerator
{
    private readonly ILogger<ImageGenerator> _logger;

    public ImageGenerator(ILogger<ImageGenerator> logger)
    {
        _logger = logger;
    }

    /// <summary>
    ///
    /// </summary>
    /// <param name="pathToFile">Fully qualified path to file</param>
    public async Task<string[]> Generate(string pathToFile)
    {
        var extention = MimeGuesser.GuessExtension(pathToFile);
        if (!string.Equals(extention, "pdf", StringComparison.Ordinal))
        {
           _logger.LogInformation("File is not a pdf. Nothing to do");
           return Array.Empty<string>();
        }

        var folderForInput = Path.GetDirectoryName(pathToFile);
        if (folderForInput is null)
        {
            throw new NullReferenceException("path to pdf file is null");
        }
        var outputPath = Path.Combine(folderForInput, "output");
        if (!Directory.Exists(outputPath))
        {
            Directory.CreateDirectory(outputPath);
        }
        await GenerateImages(pathToFile, outputPath);

        var prefix = Path.GetFileNameWithoutExtension(pathToFile);
        return Directory.GetFiles(outputPath, $"{prefix}-*.jpg")
            .OrderBy(file=> file)
            .Where(file => !string.IsNullOrWhiteSpace(file))
            .Select(file => Path.GetFileName(file))
            .ToArray();

    }

    private async Task GenerateImages(string pdfPath, string workingDirectory)
    {
        // const string prefix = "prefix";
        const string pdftoPpm = "pdftoppm";
        const string programArguments = "-jpeg";
        var prefix = Path.GetFileNameWithoutExtension(pdfPath);
        var startInfo = new ProcessStartInfo
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            FileName = pdftoPpm,
            Arguments = $"{programArguments} {pdfPath} {prefix}",
            WorkingDirectory = workingDirectory,
            RedirectStandardError = true,
            RedirectStandardOutput = true
        };
        var process = Process.Start(startInfo);
        if (process is null)
        {
            throw new NullReferenceException("unable to start pdftoppm");
        }
        var readStdOutTask = process.StandardOutput.ReadToEndAsync();
        var readStdErrorTask = process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();
        _logger.LogInformation("stdout: {Out}", await readStdOutTask);
        _logger.LogInformation("stderr: {Err}", await readStdErrorTask);
    }
}
