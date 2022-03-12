
package ru.demskv.webapplicationproject.assignment;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "assignment_employee_executor")
public class AssignmentEmployeeExecutor implements Serializable {
    @Id
    @Basic  (optional = false)
    @Column(name = "assignment_id")
    private Integer assignmentId;
    @Id
    @Basic  (optional = false)
    @Column(name = "employee_id")
    private Integer employeeId;

    public AssignmentEmployeeExecutor(Integer assignmentId, Integer employeeId) {
        this.assignmentId = assignmentId;
        this.employeeId = employeeId;
    }

    public Integer getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Integer assignmentId) {
        this.assignmentId = assignmentId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }
    
    
}
