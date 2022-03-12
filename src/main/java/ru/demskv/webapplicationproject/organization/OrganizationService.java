package ru.demskv.webapplicationproject.organization;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import java.util.List;
import java.util.Optional;

@Stateless(name="OrganizationServiceEJB")
public class OrganizationService implements OrganizationServiceLocal {

        @EJB(beanName="OrganizationDAOEJB")
        OrganizationDAOLocal DAO;
                 
        @Override
        public Long countAll(Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress, String filterDirector) {
           return DAO.countAll(
                   filterId, filterName, filterPhysAddress, filterYurAddress, filterDirector);
        }
        
        @Override
        public List<Organization> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector) {
            if(limit<=0) limit=1;
            return DAO.findAll(from, limit, columnName, desc, 
                    filterId, filterName, filterPhysAddress, filterYurAddress, filterDirector);
        }
        
        @Override
        public Optional<Organization> findById(int id) {
            return DAO.findById(id);
        }
        
        @Override
        public void create(Organization assignment){
            DAO.create(assignment);
        }
        
        @Override
        public void update(Organization assignment){
            DAO.update(assignment);
        }
        
        @Override
        public void deleteById(int id){
            DAO.deleteById(id);
        }
}
