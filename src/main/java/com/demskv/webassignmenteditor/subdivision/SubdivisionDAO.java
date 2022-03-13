package com.demskv.webassignmenteditor.subdivision;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;

@Stateless(name="SubdivisionDAOEJB")
public class SubdivisionDAO implements SubdivisionDAOLocal {
    
    @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    @Override
    public Long countAll(
            Integer filterId, String filterName, String filterAddress, String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Subdivision> root = cq.from(Subdivision.class);
        cq.select(cb.count(root));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterAddress!=null)
            cq.where(cb.like(root.<String>get("address").as(String.class),"%"+filterAddress+"%"));
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    @Override
    public List<Subdivision> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterName, String filterAddress, String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Subdivision> cq = cb.createQuery(Subdivision.class);
        Root<Subdivision> root = cq.from(Subdivision.class);
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        cq.select(root);
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterAddress!=null)
            cq.where(cb.like(root.<String>get("address").as(String.class),"%"+filterAddress+"%"));
        return entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
     }
    
    @Override
    public Optional<Subdivision> findById(int id) {
        return Optional.of(entityManager.find(Subdivision.class, id));
    }
    
    @Override
    public void create(Subdivision assignment){    
        entityManager.getTransaction().begin();
        entityManager.persist(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void update(Subdivision assignment){
        entityManager.getTransaction().begin();
        entityManager.merge(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Subdivision.class, id));
        entityManager.getTransaction().commit();
    }
}
