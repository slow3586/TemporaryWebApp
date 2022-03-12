
package ru.demskv.webapplicationproject.assignment;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import ru.demskv.webapplicationproject.employee.Employee;

public class AssignmentDTO {
    private Integer id;
    private String topic;   
    @JsonFormat(pattern = "HH:mm dd.MM.yyyy", timezone = "UTC")
    private Date executeby;
    private Integer controlattr;
    private Integer executeattr;
    private String text;
    private Integer authorId;
    private Set<Integer> executorsIds;

    public AssignmentDTO(Integer id, String topic, Date executeby, Integer controlattr, Integer executeattr, String text, Integer authorId, Set<Employee> executorsIds) {
        this.id = id;
        this.topic = topic;
        this.executeby = executeby;
        this.controlattr = controlattr;
        this.executeattr = executeattr;
        this.text = text;
        this.authorId = authorId;
        Set<Integer> ids = new HashSet<>();
        for (Employee e : executorsIds) {
            ids.add(e.getId());
        }
        this.executorsIds = ids;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Date getExecuteby() {
        return executeby;
    }

    public void setExecuteby(Date executeby) {
        this.executeby = executeby;
    }

    public Integer getControlattr() {
        return controlattr;
    }

    public void setControlattr(Integer controlattr) {
        this.controlattr = controlattr;
    }

    public Integer getExecuteattr() {
        return executeattr;
    }

    public void setExecuteattr(Integer executeattr) {
        this.executeattr = executeattr;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

    public Set<Integer> getExecutorsIds() {
        return executorsIds;
    }

    public void setExecutorsIds(Set<Integer> executorsIds) {
        this.executorsIds = executorsIds;
    }
    
    
}
