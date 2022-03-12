
package ru.demskv.webapplicationproject.organization;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;
import ru.demskv.webapplicationproject.organization.OrganizationDAOLocal;

@Stateless(name="OrganizationDAOEJB")
public class OrganizationDAO implements OrganizationDAOLocal {
     @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    @Override
    public Long countAll(Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Organization> root = cq.from(Organization.class);
        cq.select(cb.count(root));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterPhysAddress!=null)
            cq.where(cb.like(root.<String>get("physaddress").as(String.class),"%"+filterPhysAddress+"%"));
        if(filterYurAddress!=null)
            cq.where(cb.like(root.<String>get("yuraddress").as(String.class),"%"+filterYurAddress+"%"));
        if(filterDirector!=null)
            cq.where(cb.like(root.<String>get("director").as(String.class),"%"+filterDirector+"%"));
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    @Override
    public List<Organization> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Organization> cq = cb.createQuery(Organization.class);
        Root<Organization> root = cq.from(Organization.class);
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        cq.select(root);
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterPhysAddress!=null)
            cq.where(cb.like(root.<String>get("physaddress").as(String.class),"%"+filterPhysAddress+"%"));
        if(filterYurAddress!=null)
            cq.where(cb.like(root.<String>get("yuraddress").as(String.class),"%"+filterYurAddress+"%"));
        if(filterDirector!=null)
            cq.where(cb.like(root.<String>get("director").as(String.class),"%"+filterDirector+"%"));
        return entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
     }
    
    @Override
    public Optional<Organization> findById(int id) {
        return Optional.of(entityManager.find(Organization.class, id));
    }
    
    @Override
    public void create(Organization assignment){    
        entityManager.getTransaction().begin();
        entityManager.persist(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void update(Organization assignment){
        entityManager.getTransaction().begin();
        entityManager.merge(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Organization.class, id));
        entityManager.getTransaction().commit();
    }
}
