namespace Core.Agile.Template.Web.Server.Core.Models.Dtos.Service;

public class EmailDto
{
    public string To { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public List<string>? Cc { get; set; }
    public List<string>? Bcc { get; set; }
}
