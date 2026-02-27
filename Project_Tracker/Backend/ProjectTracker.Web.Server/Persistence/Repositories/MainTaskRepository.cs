using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Models.Entities.Tables;
using ProjectTracker.Web.Server.Core.Repositories;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class MainTaskRepository(IProjectTrackerDbContext context)
    : Repository<MainTaskEntity>(context), IMainTaskRepository { }
