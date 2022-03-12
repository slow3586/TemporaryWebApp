package ru.demskv.webapplicationproject.assignment;

import jakarta.ejb.Local;
import jakarta.ejb.Remote;
import java.util.List;
import java.util.Optional;

@Local
@Remote
public interface AssignmentDAOLocal {
    public Long countAll(Integer filterId, String filterTopic, String filterText);
    
    public List<AssignmentDTO> findAll(int from, int limit, String orderBy, boolean desc, Integer filterId, String filterTopic, String filterText);
    
    public Optional<AssignmentDTO> findById(int id);
    
    public List<Integer> getAssignmentExecutorsIds(int id);
    
    public void create(AssignmentDTO assignment);
    
    public void update(AssignmentDTO assignment);
    
    public void deleteById(int id);
}
