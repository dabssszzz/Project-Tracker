using Core.Agile.Template.Web.Server.Core.DbContext;
using Core.Agile.Template.Web.Server.Core.Repositories;
using Core.Agile.Template.Web.Server.Persistence.DbContext;
using Microsoft.EntityFrameworkCore;

namespace Core.Agile.Template.Web.Server.Persistence.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ICurrentApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(ICurrentApplicationDbContext context)
    {
        _context = context;
        _dbSet = ((CurrentApplicationDbContext)context).Set<T>();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

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
        if (entity != null)
        {
            _dbSet.Remove(entity);
        }
    }
}
