
package ru.demskv.webapplicationproject.employee;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;
import ru.demskv.webapplicationproject.employee.Employee;
import ru.demskv.webapplicationproject.employee.EmployeeDAOLocal;
import ru.demskv.webapplicationproject.employee.EmployeeServiceLocal;

@Stateless(name="EmployeeDAOEJB")
public class EmployeeDAO implements EmployeeDAOLocal {
     @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    @Override
    public Long countAll(Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Employee> root = cq.from(Employee.class);
        cq.select(cb.count(root));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterFirstName!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterFirstName+"%"));
        if(filterMiddleName!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterMiddleName+"%"));
        if(filterLastName!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterLastName+"%"));
        if(filterPosition!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterPosition+"%"));
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    @Override
    public List<Employee> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);
        Root<Employee> root = cq.from(Employee.class);
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        cq.select(root);
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterFirstName!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterFirstName+"%"));
        if(filterMiddleName!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterMiddleName+"%"));
        if(filterLastName!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterLastName+"%"));
        if(filterPosition!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterPosition+"%"));
        return entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
     }
    
    @Override
    public Optional<Employee> findById(int id) {
        return Optional.of(entityManager.createNamedQuery("Employee.findById", Employee.class).setParameter("id", id).getSingleResult());
    }
    
    @Override
    public void create(Employee assignment){    
        entityManager.getTransaction().begin();
        entityManager.persist(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void update(Employee assignment){
        entityManager.getTransaction().begin();
        entityManager.merge(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        int executeUpdate = entityManager.createNamedQuery("Employee.deleteById").setParameter("id", id).executeUpdate();
        entityManager.getTransaction().commit();
    }
}
