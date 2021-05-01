using System.Linq;

namespace WaterMarket.Domain
{
    public interface IRepository<TEntity> where TEntity : class
    {
        TEntity Create(TEntity newEntity);

        TEntity Update(object key, TEntity entity);

        void Delete(object key);

        IQueryable<TEntity> Retrieve();

        TEntity Retrieve(object id);
    }
}
