using Microsoft.Graph;

namespace Core.Agile.Template.Web.Server.Core.ServiceLibraries;

public interface IGraphService
{
    GraphServiceClient GetGraphClient();
}
