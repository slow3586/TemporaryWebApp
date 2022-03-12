package ru.demskv.webapplicationproject.subdivision;

import jakarta.ejb.Local;
import jakarta.ejb.Remote;
import java.util.List;
import java.util.Optional;

@Local
@Remote
public interface SubdivisionServiceLocal {
    public Long countAll(
            Integer filterId, String filterName, String filterAddress, String filterDirector);

    public List<Subdivision> findAll(int from, int limit, String columnName, boolean desc, 
            Integer filterId, String filterName, String filterAddress, String filterDirector);

    public Optional<Subdivision> findById(int id);

    public void create(Subdivision item);

    public void update(Subdivision item);

    public void deleteById(int id);
}
