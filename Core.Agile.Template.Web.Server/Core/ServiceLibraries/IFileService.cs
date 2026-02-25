namespace Core.Agile.Template.Web.Server.Core.ServiceLibraries;

public interface IFileService
{
    Task<byte[]> ReadFileAsync(string filePath);
    Task WriteFileAsync(string filePath, byte[] content);
}
