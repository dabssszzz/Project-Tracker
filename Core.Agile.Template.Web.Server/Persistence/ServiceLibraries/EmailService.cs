using Core.Agile.Template.Web.Server.Core.Models.Dtos.Service;
using Core.Agile.Template.Web.Server.Core.ServiceLibraries;
using Microsoft.Graph;
using Microsoft.Graph.Models;

namespace Core.Agile.Template.Web.Server.Persistence.ServiceLibraries;

public class EmailService : IEmailService
{
    private readonly IGraphService _graphService;

    public EmailService(IGraphService graphService)
    {
        _graphService = graphService;
    }

    public async Task SendEmailAsync(EmailDto emailDto)
    {
        // Implementation for sending emails via Microsoft Graph
        await Task.CompletedTask;
    }
}
