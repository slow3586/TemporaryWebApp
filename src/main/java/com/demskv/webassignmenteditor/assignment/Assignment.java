package com.demskv.webassignmenteditor.assignment;

import java.io.Serializable;
import java.util.Date;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Set;
import com.demskv.webassignmenteditor.employee.Employee;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Assignment (Поручение) entity class.
 * @author demskv
 */
@Entity
@Table(name = "assignment")
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    @Positive
    private Integer id;
    
    /**
     * Предмет поручения
     */
    @Basic(optional = false)
    @Column(name = "topic")
    @NotEmpty
    private String topic;   
    
    /**
     * Срок исполнения
     */
    @Column(name = "executeby")
    @Temporal(TemporalType.TIMESTAMP)
    @Future
    private Date executeby;
    
    /**
     * Признак контрольности
     */
    @Column(name = "controlattr")
    @Basic(optional = false)
    @Min(0)
    @Max(4)
    private Integer controlattr;
    
    /**
     * Признак исполнения
     */
    @Column(name = "executeattr")
    @Basic(optional = false)
    @Min(0)
    @Max(4)
    private Integer executeattr;
    
    /**
     * Текст поручения
     */
    @Lob
    @Column(name = "text")
    @NotBlank
    private String text;
    
    /**
     * Исполнители поручения
     */
    @JoinTable(name = "assignment_employee_executor", joinColumns = {
        @JoinColumn(name = "assignment_id", referencedColumnName = "id")}, inverseJoinColumns = {
        @JoinColumn(name = "employee_id", referencedColumnName = "id")})
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Employee> executors;
    
    /**
     * Автор поручения
     */
    @JoinColumn(name = "author_id", referencedColumnName = "id",  insertable=false, updatable=false)
    @ManyToOne(optional = false)
    private Employee author;
    
    @Column(name = "author_id")
    @Basic(optional = false)
    private Integer authorId;

    public Assignment() {
    }

    public Assignment(Integer id) {
        this.id = id;
    }

    public Assignment(Integer id, String topic) {
        this.id = id;
        this.topic = topic;
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
    
    public Set<Employee> getExecutors() {
        return executors;
    }

    public void setExecutors(Set<Employee> employeeCollection) {
        this.executors = employeeCollection;
    }

    public Employee getAuthor() {
        return author;
    }

    public void setAuthor(Employee author) {
        this.author = author;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Assignment)) {
            return false;
        }
        Assignment other = (Assignment) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.demskv.webassignmenteditor.assignment.Assignment[ id=" + id + " ]";
    }

    public Integer getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Integer authorId) {
        this.authorId = authorId;
    }

}
