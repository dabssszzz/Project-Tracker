using Core.Agile.Template.Web.Server.Core.Helpers;
using Core.Agile.Template.Web.Server.Core.Models.Dtos.Service;
using Core.Agile.Template.Web.Server.Core.ServiceLibraries;

namespace Core.Agile.Template.Web.Server.Persistence.Helpers;

public class SendEmailHelper : ISendEmailHelper
{
    private readonly IEmailService _emailService;

    public SendEmailHelper(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var emailDto = new EmailDto
        {
            To = to,
            Subject = subject,
            Body = body
        };

        await _emailService.SendEmailAsync(emailDto);
    }
}
