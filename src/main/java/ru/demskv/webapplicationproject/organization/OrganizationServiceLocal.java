package ru.demskv.webapplicationproject.organization;

import jakarta.ejb.Local;
import jakarta.ejb.Remote;
import java.util.List;
import java.util.Optional;

@Local
@Remote
public interface OrganizationServiceLocal {
    public Long countAll(
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector);

    public List<Organization> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector);

    public Optional<Organization> findById(int id);

    public void create(Organization item);

    public void update(Organization item);

    public void deleteById(int id);
}
