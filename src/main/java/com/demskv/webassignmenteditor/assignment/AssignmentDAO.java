package com.demskv.webassignmenteditor.assignment;

import com.demskv.webassignmenteditor.JsonUtil;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.demskv.webassignmenteditor.employee.Employee;

/**
 * Assignment (Поручение) table DAO bean.
 * @author demskv
 */
@Stateless(name="AssignmentDAOEJB")
public class AssignmentDAO implements AssignmentDAOLocal {

    @PersistenceContext(unitName="mysql")
    EntityManager entityManager;

    /**
     * Count all rows in the table that fit the filters.
     * @param filterId ID filter.
     * @param filterTopic Topic filter.
     * @param filterText Text filter.
     * @param filterAuthor Author filter.
     * @param filterExecuteby Execute by filter.
     * @param filterExecuteattr Execute attribute filter.
     * @param filterExecutors Executors filter.
     * @return Row count.
     */
    @Override
    public Long countAll(Integer filterId, String filterTopic, String filterText, 
                Integer filterAuthor, String filterExecuteby, 
                String filterExecuteattr,Set<Integer> filterExecutors) {
        
        //Setup criteria builder
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Assignment> root = cq.from(Assignment.class);
        cq.select(cb.count(root));
        
        //Setup filters
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterTopic!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterTopic+"%"));
        if(filterText!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterText+"%"));
        
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    /**
     * Return all assignment rows that fit the filters as DTOs.
     * @param from First entity index.
     * @param limit Max entity count to return.
     * @param orderBy Column to order by.
     * @param desc ASC/DESC.
     * @param filterId ID filter.
     * @param filterTopic Topic filter.
     * @param filterText Text filter.
     * @param filterAuthor Author filter.
     * @param filterExecuteby Execute by filter.
     * @param filterExecuteattr Execute attribute filter.
     * @param filterExecutors Executors filter.
     * @return A list of AssignmentDTOs. 
     */
    @Override
    public List<AssignmentDTO> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterTopic, String filterText, 
            Integer filterAuthor, String filterExecuteby, 
            String filterExecuteattr,Set<Integer> filterExecutors) {
        
        //Setup criteria builder
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Assignment> cq = cb.createQuery(Assignment.class);
        Root<Assignment> root = cq.from(Assignment.class);
        
        //Setup ordering
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        
        //Setup filters
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterTopic!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterTopic+"%"));
        if(filterText!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterText+"%"));
        if(filterAuthor!=null)
            cq.where(cb.equal(root.get("author").get("id"),filterAuthor));
        if(filterExecutors!=null && !filterExecutors.isEmpty())
            cq.where(root.join("executors").get("id").in(filterExecutors));
        if(filterExecuteattr!=null)
            cq.where(cb.equal(root.get("executeattr"),filterExecuteattr));
        if(filterExecuteby!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterText+"%"));
        
        //Convert assignments into DTOs
        List<Assignment> assignments = entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
        List<AssignmentDTO> dtos = new ArrayList<>(assignments.size());
        for (Assignment a : assignments) {
            dtos.add(new AssignmentDTO(
                    a.getId(), a.getTopic(), AssignmentDTO.df.format(a.getExecuteby()), 
                    a.getControlattr(),a.getExecuteattr(), a.getText(), 
                    a.getAuthor().getId(), a.getExecutors()));
        }
        
        return dtos;
     }
    
    /**
     * Create an assignment from assignment DTO.
     * @param dto Assignment DTO to create from.
     */
    @Override
    public void create(AssignmentDTO dto){    
        entityManager.getTransaction().begin();
        
        //Convert DTO into assignment.
        Assignment assignment = new Assignment();
        assignment.setTopic(dto.getTopic());
        assignment.setExecuteby(dto.getExecutebyAsDate());
        assignment.setControlattr(dto.getControlattr());
        assignment.setExecuteattr(dto.getExecuteattr());
        assignment.setText(dto.getText());
        assignment.setAuthor(entityManager.getReference(Employee.class, dto.getAuthor()));
        Set<Employee> l = new HashSet<>(dto.getExecutors().size());
        for (Integer eid : dto.getExecutors())
            l.add(entityManager.getReference(Employee.class, eid));
        assignment.setExecutors(l);
        assignment.setAuthorId(dto.getAuthor());
        
        entityManager.persist(assignment);
        entityManager.getTransaction().commit();
    }
    
    /**
     * Update an assignment from assignment DTO by ID.
     * @param dto Assignment DTO with ID to update from.
     */
    @Override
    public void update(AssignmentDTO dto){
        entityManager.getTransaction().begin();
        
        //Convert DTO into assignment.
        Assignment assignment = entityManager.find(Assignment.class, dto.getId());
        assignment.setTopic(dto.getTopic());
        assignment.setExecuteby(dto.getExecutebyAsDate());
        assignment.setControlattr(dto.getControlattr());
        assignment.setExecuteattr(dto.getExecuteattr());
        assignment.setText(dto.getText());
        assignment.setAuthor(entityManager.getReference(Employee.class, dto.getAuthor()));
        Set<Employee> l = new HashSet<>(dto.getExecutors().size());
        for (Integer eid : dto.getExecutors())
            l.add(entityManager.getReference(Employee.class, eid));
        assignment.setExecutors(l);
        
        entityManager.merge(assignment);
        entityManager.getTransaction().commit();
    }
    
    /**
     * Delete an assignment by ID.
     * @param id Assignment ID.
     */
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Assignment.class, id));
        entityManager.getTransaction().commit();
    }
}

