package com.demskv.webassignmenteditor.employee;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;

/**
 * Employee (Сотрудник) table DAO bean.
 * @author demskv
 */
@Stateless(name="EmployeeDAOEJB")
public class EmployeeDAO implements EmployeeDAOLocal {
    
    @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    /**
     * Count all rows in the table that fit the filters.
     * @param filterId ID filter.
     * @param filterFirstName First name filter.
     * @param filterMiddleName Middle name filter.
     * @param filterLastName Last name filter.
     * @param filterPosition Position filter.
     * @return Row count.
     */
    @Override
    public Long countAll(Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
        //Setup criteria builder
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Employee> root = cq.from(Employee.class);
        cq.select(cb.count(root));
        
        //Setup filters
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterFirstName!=null)
            cq.where(cb.like(root.<String>get("firstname").as(String.class),"%"+filterFirstName+"%"));
        if(filterMiddleName!=null)
            cq.where(cb.like(root.<String>get("middlename").as(String.class),"%"+filterMiddleName+"%"));
        if(filterLastName!=null)
            cq.where(cb.like(root.<String>get("lastname").as(String.class),"%"+filterLastName+"%"));
        if(filterPosition!=null)
            cq.where(cb.like(root.<String>get("position").as(String.class),"%"+filterPosition+"%"));
        
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    /**
     * Return all employee rows that fit the filters.
     * @param from
     * @param limit
     * @param orderBy
     * @param desc
     * @param filterId
     * @param filterFirstName
     * @param filterMiddleName
     * @param filterLastName
     * @param filterPosition
     * @return List of employees.
     */
    @Override
    public List<Employee> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
        
        //Setup criteria builder
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);
        Root<Employee> root = cq.from(Employee.class);
        
        //Setup ordering
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        
        //Setup filters
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterFirstName!=null)
            cq.where(cb.like(root.<String>get("firstname").as(String.class),"%"+filterFirstName+"%"));
        if(filterMiddleName!=null)
            cq.where(cb.like(root.<String>get("middlename").as(String.class),"%"+filterMiddleName+"%"));
        if(filterLastName!=null)
            cq.where(cb.like(root.<String>get("lastname").as(String.class),"%"+filterLastName+"%"));
        if(filterPosition!=null)
            cq.where(cb.like(root.<String>get("position").as(String.class),"%"+filterPosition+"%"));
        
        return entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
     }
    
    /**
     * Create an employee.
     * @param employee Employee to put into the database.
     */
    @Override
    public void create(Employee employee){    
        entityManager.getTransaction().begin();
        entityManager.persist(employee);
        entityManager.getTransaction().commit();
    }
    
    /**
     * Update an employee.
     * @param employee Employee object with ID to update.
     */
    @Override
    public void update(Employee employee){
        entityManager.getTransaction().begin();
        entityManager.merge(employee);
        entityManager.getTransaction().commit();
    }
    
    /**
     * Delete an employee.
     * @param id Employee ID to delete.
     */
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Employee.class, id));
        entityManager.getTransaction().commit();
    }
}
