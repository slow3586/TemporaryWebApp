package com.demskv.webassignmenteditor.organization;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import com.demskv.webassignmenteditor.employee.Employee;

@Stateless(name="OrganizationDAOEJB")
public class OrganizationDAO implements OrganizationDAOLocal {
    
    @PersistenceContext(unitName="mysql")
    EntityManager entityManager;
    
    @Override
    public Long countAll(Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Organization> root = cq.from(Organization.class);
        cq.select(cb.count(root));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterPhysAddress!=null)
            cq.where(cb.like(root.<String>get("physaddress").as(String.class),"%"+filterPhysAddress+"%"));
        if(filterYurAddress!=null)
            cq.where(cb.like(root.<String>get("yuraddress").as(String.class),"%"+filterYurAddress+"%"));
        if(filterDirector!=null)
            cq.where(cb.like(root.<String>get("director").as(String.class),"%"+filterDirector+"%"));
        return entityManager.createQuery(cq).getSingleResult();
    }
    
    @Override
    public List<OrganizationDTO> findAll(int from, int limit, String orderBy, boolean desc, 
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Organization> cq = cb.createQuery(Organization.class);
        Root<Organization> root = cq.from(Organization.class);
        if(desc)
            cq.orderBy(cb.desc(root.get(orderBy)));
        else
            cq.orderBy(cb.asc(root.get(orderBy)));
        if(filterId!=null)
            cq.where(cb.equal(root.get("id"),filterId));
        if(filterName!=null)
            cq.where(cb.like(root.<String>get("name").as(String.class),"%"+filterName+"%"));
        if(filterPhysAddress!=null)
            cq.where(cb.like(root.<String>get("physaddress").as(String.class),"%"+filterPhysAddress+"%"));
        if(filterYurAddress!=null)
            cq.where(cb.like(root.<String>get("yuraddress").as(String.class),"%"+filterYurAddress+"%"));
        if(filterDirector!=null)
            cq.where(cb.like(root.<String>get("director").as(String.class),"%"+filterDirector+"%"));
        List<Organization> orgs = entityManager.createQuery(cq).setFirstResult(from).setMaxResults(limit).getResultList();
        List<OrganizationDTO> dtos = new ArrayList<>(orgs.size());
        for (Organization a : orgs) {
            dtos.add(new OrganizationDTO(
                    a.getId(), a.getName(), a.getPhysAddress(), 
                    a.getYurAddress(), a.getDirector().getId()));
        }
        return dtos;
    }
    
    @Override
    public void create(OrganizationDTO dto){    
        entityManager.getTransaction().begin();
        
        Organization organization = new Organization();
        organization.setName(dto.getName());
        organization.setYurAddress(dto.getYurAddress());
        organization.setPhysAddress(dto.getPhysAddress());
        Employee director = entityManager.getReference(Employee.class, dto.getDirector());
        organization.setDirector(director);
        entityManager.persist(organization);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void update(OrganizationDTO dto){
        entityManager.getTransaction().begin();
        
        Organization organization = entityManager.find(Organization.class, dto.getId());
        organization.setName(dto.getName());
        organization.setYurAddress(dto.getYurAddress());
        organization.setPhysAddress(dto.getPhysAddress());
        Employee director = entityManager.getReference(Employee.class, dto.getDirector());
        organization.setDirector(director);
        entityManager.merge(organization);
        entityManager.getTransaction().commit();
    }
    
    @Override
    public void deleteById(int id){
        entityManager.getTransaction().begin();
        entityManager.remove(entityManager.find(Organization.class, id));
        entityManager.getTransaction().commit();
    }
}
