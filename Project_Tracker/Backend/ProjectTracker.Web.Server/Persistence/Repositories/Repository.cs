using ProjectTracker.Web.Server.Core.DbContext;
using ProjectTracker.Web.Server.Core.Repositories;
using ProjectTracker.Web.Server.Persistence.DbContext;
using Microsoft.EntityFrameworkCore;

namespace ProjectTracker.Web.Server.Persistence.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly IProjectTrackerDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(IProjectTrackerDbContext context)
    {
        _context = context;
        _dbSet = ((ProjectTrackerDbContext)context).Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null) _dbSet.Remove(entity);
    }
}
