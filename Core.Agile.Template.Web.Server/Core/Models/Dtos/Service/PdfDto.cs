namespace Core.Agile.Template.Web.Server.Core.Models.Dtos.Service;

public class PdfDto
{
    public byte[] Content { get; set; } = Array.Empty<byte>();
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = "application/pdf";
}
