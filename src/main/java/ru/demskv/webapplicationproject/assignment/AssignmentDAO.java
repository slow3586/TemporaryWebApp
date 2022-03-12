
package ru.demskv.webapplicationproject.assignment;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import ru.demskv.webapplicationproject.employee.Employee;


@Stateless(name="AssignmentDAOEJB")
public class AssignmentDAO implements AssignmentDAOLocal {

    @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    @Override
    public Long countAll(Integer filterId, String filterTopic, String filterText) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Assignment> root = cq.from(Assignment.class);
        cq.select(cb.count(root));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterTopic!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterTopic+"%"));
        if(filterText!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterText+"%"));
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    @Override
    public List<AssignmentDTO> findAll(int from, int limit, String orderBy, boolean desc, Integer filterId, String filterTopic, String filterText) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<AssignmentDTO> cq = cb.createQuery(AssignmentDTO.class);
        Root<Assignment> root = cq.from(Assignment.class);
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        cq.select(cb.construct(
            AssignmentDTO.class,
            root.get("id"),
            root.get("topic"),
            root.get("executeby"),
            root.get("controlattr"),
            root.get("executeattr"),
            root.get("text"),
            root.join("author").get("id"),
            root.joinCollection("executors").get("id")
        ));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterTopic!=null)
            cq.where(cb.like(root.<String>get("topic").as(String.class),"%"+filterTopic+"%"));
        if(filterText!=null)
            cq.where(cb.like(root.<String>get("text").as(String.class),"%"+filterText+"%"));
        return entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
     }
    
    @Override
    public Optional<AssignmentDTO> findById(int id) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<AssignmentDTO> cq = cb.createQuery(AssignmentDTO.class);
        Root<Assignment> root = cq.from(Assignment.class);
        cq.select(cb.construct(
            AssignmentDTO.class,
            root.get("id"),
            root.get("topic"),
            root.get("executeby"),
            root.get("controlattr"),
            root.get("executeattr"),
            root.get("text"),
            root.join("author").get("id"),
            root.joinCollection("executors").get("id")
        ));
        cq.where(cb.equal(root.get("id"),id));
        return Optional.of(entityManager.createQuery(cq).getSingleResult());
    }
    
    @Override
    public List<Integer> getAssignmentExecutorsIds(int id){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<AssignmentEmployeeExecutor> cq = cb.createQuery(AssignmentEmployeeExecutor.class);
        Root<AssignmentEmployeeExecutor> root = cq.from(AssignmentEmployeeExecutor.class);
        cq.select(root);
            cq.where(cb.equal(root.get("assignment_id"),id));
        List<AssignmentEmployeeExecutor> rows = entityManager.createQuery(cq).getResultList();
        List<Integer> ret = new ArrayList<>(rows.size());
        for (int i = 0; i < ret.size(); i++) {
            ret.add(rows.get(i).getEmployeeId());
        }
        return ret;
    }
    
    @Override
    public void create(AssignmentDTO dto){    
        entityManager.getTransaction().begin();
        
        Assignment assignment = new Assignment(0);
        assignment.setTopic(dto.getTopic());
        assignment.setExecuteby(dto.getExecuteby());
        assignment.setControlattr(dto.getControlattr());
        assignment.setExecuteattr(dto.getExecuteattr());
        assignment.setText(dto.getText());
        assignment.setAuthor(entityManager.getReference(Employee.class, dto.getAuthorId()));
        List<Employee> l = new ArrayList<>(dto.getExecutorsIds().size());
        for (Integer eid : dto.getExecutorsIds())
            l.add(entityManager.getReference(Employee.class, eid));
        assignment.setExecutors(l);
        
        entityManager.persist(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void update(AssignmentDTO dto){
        entityManager.getTransaction().begin();
        
        Assignment assignment = entityManager.find(Assignment.class, dto.getId());
        assignment.setTopic(dto.getTopic());
        assignment.setExecuteby(dto.getExecuteby());
        assignment.setControlattr(dto.getControlattr());
        assignment.setExecuteattr(dto.getExecuteattr());
        assignment.setText(dto.getText());
        assignment.setAuthor(entityManager.getReference(Employee.class, dto.getAuthorId()));
        List<Employee> l = new ArrayList<>(dto.getExecutorsIds().size());
        for (Integer eid : dto.getExecutorsIds())
            l.add(entityManager.getReference(Employee.class, eid));
        assignment.setExecutors(l);
        
        entityManager.merge(assignment);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Assignment.class, id));
        entityManager.getTransaction().commit();
    }
}

