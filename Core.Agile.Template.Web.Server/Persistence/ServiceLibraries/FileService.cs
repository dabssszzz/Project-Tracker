using Core.Agile.Template.Web.Server.Core.ServiceLibraries;

namespace Core.Agile.Template.Web.Server.Persistence.ServiceLibraries;

public class FileService : IFileService
{
    public async Task<byte[]> ReadFileAsync(string filePath)
    {
        return await File.ReadAllBytesAsync(filePath);
    }

    public async Task WriteFileAsync(string filePath, byte[] content)
    {
        var directory = Path.GetDirectoryName(filePath);
        if (!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        await File.WriteAllBytesAsync(filePath, content);
    }
}
