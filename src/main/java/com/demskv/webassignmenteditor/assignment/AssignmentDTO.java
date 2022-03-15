package com.demskv.webassignmenteditor.assignment;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import com.demskv.webassignmenteditor.employee.Employee;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Assignment (Поручение) data transfer object.
 * Author and executors are replaced with their IDs.
 * @author demskv
 */
public class AssignmentDTO {
    private Integer id;
    private String topic;   
    private String executeby;
    private Integer controlattr;
    private Integer executeattr;
    private String text;
    private Integer author;
    private Set<Integer> executors;
    public static final SimpleDateFormat df = new SimpleDateFormat( "HH:mm dd.MM.yyyy" );
    
    public AssignmentDTO() {
    }
    
    public AssignmentDTO(Integer id, String topic, String executeby, Integer controlattr, Integer executeattr, String text, Integer authorId, Set<Employee> executorsIds) {
        this.id = id;
        this.topic = topic;
        this.executeby = executeby;
        this.controlattr = controlattr;
        this.executeattr = executeattr;
        this.text = text;
        this.author = authorId;
        Set<Integer> ids = new HashSet<>();
        for (Employee e : executorsIds) {
            ids.add(e.getId());
        }
        this.executors = ids;
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

    public String getExecuteby() {
        return executeby;
    }
    
    public Date getExecutebyAsDate() {
        Date date = null;
        try {
            date = df.parse(executeby);
        } catch (ParseException ex) {
            Logger.getLogger(AssignmentDTO.class.getName()).log(Level.SEVERE, null, ex);
        }
        return date;
    }

    public void setExecuteby(String executeby) {
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

    public Integer getAuthor() {
        return author;
    }

    public void setAuthor(Integer author) {
        this.author = author;
    }

    public Set<Integer> getExecutors() {
        return executors;
    }

    public void setExecutors(Set<Integer> executors) {
        this.executors = executors;
    }
    
    
}
