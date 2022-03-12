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

    public List<OrganizationDTO> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterName, String filterPhysAddress, String filterYurAddress,String filterDirector);

    public void create(OrganizationDTO item);

    public void update(OrganizationDTO item);

    public void deleteById(int id);
}
