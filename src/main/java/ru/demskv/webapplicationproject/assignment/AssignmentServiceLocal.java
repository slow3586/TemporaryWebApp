
package ru.demskv.webapplicationproject.assignment;

import jakarta.ejb.Local;
import jakarta.ejb.Remote;
import java.util.List;
import java.util.Optional;

@Local
@Remote
public interface AssignmentServiceLocal {
        public Long countAll(Integer filterId, String filterTopic, String filterText);
        
        public List<Assignment> findAll(int from, int limit, String columnName, boolean desc, Integer filterId, String filterTopic, String filterText);
        
        public Optional<Assignment> findById(int id);
        
        public void create(Assignment assignment);
        
        public void update(Assignment assignment);
        
        public void deleteById(int id);
}
