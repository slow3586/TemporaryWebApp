
package ru.demskv.webapplicationproject.assignment;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import java.util.HashSet;
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
    private Integer author_id;
    private Set<Integer> executors_ids;

    public AssignmentDTO(Integer id, String topic, Date executeby, Integer controlattr, Integer executeattr, String text, Integer authorId, Set<Employee> executorsIds) {
        this.id = id;
        this.topic = topic;
        this.executeby = executeby;
        this.controlattr = controlattr;
        this.executeattr = executeattr;
        this.text = text;
        this.author_id = authorId;
        Set<Integer> ids = new HashSet<>();
        for (Employee e : executorsIds) {
            ids.add(e.getId());
        }
        this.executors_ids = ids;
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

    public Integer getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(Integer author_id) {
        this.author_id = author_id;
    }

    public Set<Integer> getExecutors_ids() {
        return executors_ids;
    }

    public void setExecutors_ids(Set<Integer> executors_ids) {
        this.executors_ids = executors_ids;
    }
    
    
}
