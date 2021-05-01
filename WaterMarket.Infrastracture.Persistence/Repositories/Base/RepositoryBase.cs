using WaterMarket.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WaterMarket.Persistence.Repositories.Base
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected WaterMarketContext context;
        public RepositoryBase(WaterMarketContext context)
        {
            this.context = context;
        }

        public TEntity Create(TEntity newEntity)
        {
            context.Set<TEntity>()
                   .Add(newEntity);
            context.SaveChanges();
            return newEntity;
        }

        public void Delete(object key)
        {
            var entityToRemove = context.Set<TEntity>().Find(key);
            if (entityToRemove != null)
            {
                context.Set<TEntity>().Remove(entityToRemove);
                context.SaveChanges();
            }

        }

        public IQueryable<TEntity> Retrieve()
        {
            return context.Set<TEntity>();
        }


        public TEntity Retrieve(object id)
        {
            return context.Set<TEntity>().Find(id);
        }

        public TEntity Update(object key, TEntity entity)
        {
            var entityToUpdate = context.Set<TEntity>()
                                        .Find(key);
            if (entityToUpdate != null)
            {
                context.Entry<TEntity>(entityToUpdate)
                       .CurrentValues
                       .SetValues(entity);
                context.SaveChanges();
            }
            return entityToUpdate;

        }
    }
}
