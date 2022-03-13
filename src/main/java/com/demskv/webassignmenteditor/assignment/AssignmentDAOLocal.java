package com.demskv.webassignmenteditor.assignment;

import jakarta.ejb.Local;
import jakarta.ejb.Remote;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Local
@Remote
public interface AssignmentDAOLocal {
    public Long countAll(
                Integer filterId, String filterTopic, String filterText, 
                Integer filterAuthor, String filterExecuteby, 
                String filterExecuteattr,Set<Integer> filterExecutors);
        
        public List<AssignmentDTO> findAll(int from, int limit, String columnName, boolean desc, 
                Integer filterId, String filterTopic, String filterText, 
                Integer filterAuthor, String filterExecuteby, 
                String filterExecuteattr,Set<Integer> filterExecutors);
    
    public void create(AssignmentDTO assignment);
    
    public void update(AssignmentDTO assignment);
    
    public void deleteById(int id);
}
