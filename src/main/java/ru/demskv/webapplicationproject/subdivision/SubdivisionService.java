package ru.demskv.webapplicationproject.subdivision;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import java.util.List;
import java.util.Optional;

@Stateless(name="SubdivisionServiceEJB")
public class SubdivisionService implements SubdivisionServiceLocal {

        @EJB(beanName="SubdivisionDAOEJB")
        SubdivisionDAOLocal DAO;
                 
        @Override
        public Long countAll(Integer filterId, String filterName, String filterAddress, String filterDirector) {
           return DAO.countAll(
                   filterId, filterName, filterAddress, filterDirector);
        }
        
        @Override
        public List<Subdivision> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterName, String filterAddress, String filterDirector) {
            if(limit<=0) limit=1;
            return DAO.findAll(from, limit, columnName, desc, 
                    filterId, filterName, filterAddress, filterDirector);
        }
        
        @Override
        public Optional<Subdivision> findById(int id) {
            return DAO.findById(id);
        }
        
        @Override
        public void create(Subdivision assignment){
            DAO.create(assignment);
        }
        
        @Override
        public void update(Subdivision assignment){
            DAO.update(assignment);
        }
        
        @Override
        public void deleteById(int id){
            DAO.deleteById(id);
        }
}
