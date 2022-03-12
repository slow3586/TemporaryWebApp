
package ru.demskv.webapplicationproject.assignment;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import java.util.List;
import java.util.Optional;

@Stateless(name="AssignmentServiceEJB")
public class AssignmentService implements AssignmentServiceLocal {

        @EJB(beanName="AssignmentDAOEJB")
        AssignmentDAOLocal DAO;
                 
        @Override
        public Long countAll(Integer filterId, String filterTopic, String filterText) {
           return DAO.countAll(filterId, filterTopic, filterText);
        }
        
        @Override
        public List<AssignmentDTO> findAll(int from, int limit, String columnName, boolean desc, Integer filterId, String filterTopic, String filterText) {
            if(limit<=0) limit=1;
            return DAO.findAll(from, limit, columnName, desc, filterId, filterTopic, filterText);
        }
        
        @Override
        public Optional<AssignmentDTO> findById(int id) {
            return DAO.findById(id);
        }
        
        @Override
        public List<Integer> getAssignmentExecutorsIds(int id){
            return DAO.getAssignmentExecutorsIds(id);
        }
        
        @Override
        public void create(AssignmentDTO assignment){
            DAO.create(assignment);
        }
        
        @Override
        public void update(AssignmentDTO assignment){
            DAO.update(assignment);
        }
        
        @Override
        public void deleteById(int id){
            DAO.deleteById(id);
        }
}
