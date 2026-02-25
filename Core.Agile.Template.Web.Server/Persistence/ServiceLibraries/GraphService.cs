using Azure.Identity;
using Core.Agile.Template.Web.Server.Core.ServiceLibraries;
using Microsoft.Graph;

namespace Core.Agile.Template.Web.Server.Persistence.ServiceLibraries;

public class GraphService : IGraphService
{
    private readonly string _tenantId;
    private readonly string _clientId;
    private readonly string _clientSecret;

    public GraphService(string tenantId, string clientId, string clientSecret)
    {
        _tenantId = tenantId;
        _clientId = clientId;
        _clientSecret = clientSecret;
    }

    public GraphServiceClient GetGraphClient()
    {
        var clientSecretCredential = new ClientSecretCredential(
            _tenantId, _clientId, _clientSecret);

        return new GraphServiceClient(clientSecretCredential);
    }
}
