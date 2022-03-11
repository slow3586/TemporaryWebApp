package ru.demskv.webapplicationproject.assignment;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import java.util.List;
import java.util.Optional;
import ru.demskv.webapplicationproject.employee.Employee;
import ru.demskv.webapplicationproject.employee.EmployeeDAOLocal;
import ru.demskv.webapplicationproject.employee.EmployeeServiceLocal;

@Stateless(name="EmployeeServiceEJB")
public class EmployeeService implements EmployeeServiceLocal {

        @EJB(beanName="EmployeeDAOEJB")
        EmployeeDAOLocal DAO;
                 
        @Override
        public Long countAll(Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
           return DAO.countAll(
                   filterId, filterFirstName, filterMiddleName, filterLastName, filterPosition);
        }
        
        @Override
        public List<Employee> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterFirstName, String filterMiddleName, String filterLastName, String filterPosition) {
            if(limit<=0) limit=1;
            return DAO.findAll(from, limit, columnName, desc, 
                    filterId, filterFirstName, filterMiddleName, filterLastName, filterPosition);
        }
        
        @Override
        public Optional<Employee> findById(int id) {
            return DAO.findById(id);
        }
        
        @Override
        public void create(Employee assignment){
            DAO.create(assignment);
        }
        
        @Override
        public void update(Employee assignment){
            DAO.update(assignment);
        }
        
        @Override
        public void deleteById(int id){
            DAO.deleteById(id);
        }
}
