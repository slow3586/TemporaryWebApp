package com.demskv.webassignmenteditor;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

/**
 *  Exception class that triggers on violations of entity constraints, 
 *  for example when passing incorrect JSON data or JAX-RS queries.
 */
@Provider
public class ConstraintViolationExceptionMapper
               implements ExceptionMapper<ConstraintViolationException> {

    /**
     * Puts constraint violation exception details into a web response.
     * @param exception Constraint violation exception.
     * @return Web response with constraint violation details.
     */
    @Override
  public Response toResponse(final ConstraintViolationException exception) {
      return Response.status(Response.Status.BAD_REQUEST)
                     .entity(prepareMessage(exception))
                     .type("text/plain")
                     .build();
  }

  private String prepareMessage(ConstraintViolationException exception) {
      StringBuilder b = new StringBuilder("Constraints violated: ");
      for (ConstraintViolation<?> cv : exception.getConstraintViolations()) {
          b.append(cv.getPropertyPath()).append(" ").append(cv.getMessage()).append("\n");
      }
      return b.toString();
  }
}
