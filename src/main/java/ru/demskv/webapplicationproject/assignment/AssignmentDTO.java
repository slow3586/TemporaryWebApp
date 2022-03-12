
package ru.demskv.webapplicationproject.assignment;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import ru.demskv.webapplicationproject.employee.Employee;

public class AssignmentDTO {
    private Integer id;
    private String topic;   
    private Date executeby;
    private Integer controlattr;
    private Integer executeattr;
    private String text;
    private Integer authorId;
    private Collection<Integer> executorsIds;
    
    public AssignmentDTO(Integer id, String topic, Date executeby, Integer controlattr, Integer executeattr, String text, Integer authorId, Integer executorsIds) {
        this.id = id;
        this.topic = topic;
        this.executeby = executeby;
        this.controlattr = controlattr;
        this.executeattr = executeattr;
        this.text = text;
        this.authorId = authorId;
        this.executorsIds = new ArrayList<>();
        this.executorsIds.add(executorsIds);
    }

    public AssignmentDTO(Integer id, String topic, Date executeby, Integer controlattr, Integer executeattr, String text, Integer authorId, Collection<Integer> executorsIds) {
        this.id = id;
        this.topic = topic;
        this.executeby = executeby;
        this.controlattr = controlattr;
        this.executeattr = executeattr;
        this.text = text;
        this.authorId = authorId;
        this.executorsIds = executorsIds;
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

    public Collection<Integer> getExecutorsIds() {
        return executorsIds;
    }

    public void setExecutorsIds(Collection<Integer> executorsIds) {
        this.executorsIds = executorsIds;
    }
    
    
}
