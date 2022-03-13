package com.demskv.webassignmenteditor;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.sql.SQLIntegrityConstraintViolationException;


@Provider
public class SQLIntegrityConstraintViolationExceptionMapper 
               implements ExceptionMapper<SQLIntegrityConstraintViolationException> {

    @Override
  public Response toResponse(final SQLIntegrityConstraintViolationException exception) {
      return Response.status(Response.Status.BAD_REQUEST)
                     .entity("Cannot process the request: "+exception.getMessage())
                     .type("text/plain")
                     .build();
  }
}