package com.demskv.webassignmenteditor.organization;

import jakarta.ejb.EJB;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.demskv.webassignmenteditor.JsonUtil;

/**
 * Organization (Организация) JAX-RS controller class.
 * @author demskv
 */
@Path("api/organization/")
public class OrganizationController {
    final static Logger logger = LoggerFactory.getLogger(OrganizationController.class);
    
    @EJB(beanName="OrganizationServiceEJB")
    private OrganizationServiceLocal service;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(
            @Min(0) @QueryParam("from") int from,
            @Min(1) @Max(50) @QueryParam("limit") int limit,
            @QueryParam("order_by") String orderBy,
            @QueryParam("id") Integer filterId,
            @QueryParam("name") String filterName,
            @QueryParam("physaddress") String filterPhysAddress,
            @QueryParam("yuraddress") String filterYurAddress,
            @QueryParam("director") String filterDirector
    ) {
        boolean orderDesc = false;
        String columnName = "id";
        if(orderBy!=null && !orderBy.isEmpty()){
            orderDesc = !orderBy.substring(0, 1).equals("-");
            columnName = orderBy.substring(1);
        }
        return Response.ok()
                .header("Content-Range", "items "+from+"-"+(from+limit)+"/"+service.countAll(
                        filterId, filterName, filterPhysAddress, filterYurAddress, filterDirector))
                .entity(JsonUtil.tojson((service.findAll(from, limit, columnName, orderDesc, 
                        filterId, filterName, filterPhysAddress, filterYurAddress, filterDirector))))
                .build();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(@Valid OrganizationDTO in) {
        service.create(in);
        return Response.ok().build();
    }
    
    @PUT
    @Path("{id}")
    public Response put(@Valid OrganizationDTO in) {
        service.update(in);
        return Response.ok().build();
    }
    
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") @Min(1) Integer id) {
        service.deleteById(id);
        return Response.ok().build();
    }
}