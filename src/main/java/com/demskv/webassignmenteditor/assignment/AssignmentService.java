
package com.demskv.webassignmenteditor.assignment;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import java.util.List;
import java.util.Set;

/**
 * Assignment (поручение) service layer bean.
 * @author demskv
 */
@Stateless(name="AssignmentServiceEJB")
public class AssignmentService implements AssignmentServiceLocal {

        @EJB(beanName="AssignmentDAOEJB")
        AssignmentDAOLocal DAO;
                 
        @Override
        public Long countAll(Integer filterId, String filterTopic, String filterText, 
                Integer filterAuthor, String filterExecuteby, 
                String filterExecuteattr,Set<Integer> filterExecutors) {
           return DAO.countAll(filterId, filterTopic, filterText, 
                   filterAuthor, filterExecuteby, 
                   filterExecuteattr, filterExecutors);
        }
        
        @Override
        public List<AssignmentDTO> findAll(int from, int limit, String columnName, boolean desc, 
                Integer filterId, String filterTopic, String filterText, 
                Integer filterAuthor, String filterExecuteby, 
                String filterExecuteattr,Set<Integer> filterExecutors) {
            if(limit<=0) limit=1;
            return DAO.findAll(from, limit, columnName, desc, 
                    filterId, filterTopic, filterText, 
                    filterAuthor, filterExecuteby, 
                    filterExecuteattr, filterExecutors);
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
