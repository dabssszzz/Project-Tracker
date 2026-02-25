using Core.Agile.Template.Web.Server.Core.Models.Dtos.Service;

namespace Core.Agile.Template.Web.Server.Core.ServiceLibraries;

public interface IEmailService
{
    Task SendEmailAsync(EmailDto emailDto);
}
