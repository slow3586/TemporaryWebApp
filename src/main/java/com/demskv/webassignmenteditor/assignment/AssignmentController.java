
package com.demskv.webassignmenteditor.assignment;

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
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.demskv.webassignmenteditor.JsonUtil;

/**
 * Assignment JAX-RS controller class.
 * @author demskv
 */
@Path("api/assignment/")
public class AssignmentController {
    final static Logger logger = LoggerFactory.getLogger(AssignmentController.class);

    @EJB(beanName="AssignmentServiceEJB")
    private AssignmentServiceLocal service;
    
    /**
     * GET method for data requests.
     * Example: assignment?from=0&limit=10&order_by=+id&topic=text&text=txt
     * The count and range of returned objects is put in the Content-Range header param.
     * @param from First entity index from the list.
     * @param limit Max entity count to return.
     * @param orderBy Column to order by with DESC/ASC sign in front.
     * @param filterId ID filter.
     * @param filterTopic Topic filter.
     * @param filterText Text filter.
     * @param filterAuthor Author filter.
     * @param filterExecuteby Execute by filter.
     * @param filterExecuteattr Execute attribute filter.
     * @param filterExecutors Executors filter.
     * @return JSON response which is a list of assignments.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(
            @Min(0) @QueryParam("from") int from,
            @Min(1) @Max(50) @QueryParam("limit") int limit,
            @QueryParam("order_by") String orderBy,
            @QueryParam("id") Integer filterId,
            @QueryParam("topic") String filterTopic,
            @QueryParam("text") String filterText,
            @QueryParam("author") Integer filterAuthor,
            @QueryParam("executeby") String filterExecuteby,
            @QueryParam("executeattr") String filterExecuteattr,
            @QueryParam("executors") Set<Integer> filterExecutors
    ) {
        logger.debug("Received  @GET at api/assignment");
        logger.debug("Params: from={} limit={} orderBy={} filterId={} filterTopic={} filterText={} filterAuthor={} filterExecuteby={} filterExecuteattr={} filterExecutors={}",
                from, limit, orderBy, filterId, filterTopic, filterText, filterAuthor, filterExecuteby, filterExecuteattr, filterExecutors);
        
        //Parse orderBy param
        //Example: +id, -id, +name, -name
        //+ is ASC, - is DESC
        boolean orderDesc = false;
        String columnName = "id";
        if(orderBy!=null && !orderBy.isEmpty()){
            orderDesc = !orderBy.substring(0, 1).equals("-");
            columnName = orderBy.substring(1);
            //if(columnName=="executors_ids") columnName="executors"
        }
        
        //Build content range and total count of objects in the DB header string
        //Example: items 0-10/100
        StringBuilder contentRangeBuilder = new StringBuilder();
        contentRangeBuilder.append("items ")
                .append(from).append("-").append(from+limit).append("/")
                .append(service.countAll(filterId, filterTopic, filterText, filterAuthor, 
                                filterExecuteby, filterExecuteattr, filterExecutors));
        return Response.ok()
                .header("Content-Range", contentRangeBuilder.toString())
                
                //Return entity as JSON
                .entity(JsonUtil.tojson((service.findAll(
                        from, limit, columnName, orderDesc, 
                        filterId, filterTopic, filterText, filterAuthor,
                        filterExecuteby, filterExecuteattr, filterExecutors))))
                
                .build();
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(@Valid AssignmentDTO assignment) {
        service.create(assignment);
        return Response.ok().build();
    }
    
    @PUT
    @Path("{id}")
    public Response put(@Valid AssignmentDTO assignment) {
        service.update(assignment);
        return Response.ok().build();
    }
    
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") @Min(1) Integer id) {
        service.deleteById(id);
        return Response.ok().build();
    }
}