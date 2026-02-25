namespace Core.Agile.Template.Web.Server.Core.Helpers;

public interface ISendEmailHelper
{
    Task SendEmailAsync(string to, string subject, string body);
}
