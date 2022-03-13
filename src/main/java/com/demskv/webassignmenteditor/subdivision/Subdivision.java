package com.demskv.webassignmenteditor.subdivision;

import java.io.Serializable;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.demskv.webassignmenteditor.employee.Employee;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Subdivision (Подразделение) entity class.
 * @author demskv
 */
@Entity
@Table(name = "subdivision")
public class Subdivision implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    /**
     * Наименование подразделения
     */
    @Basic(optional = false)
    @Column(name = "name")
    @NotBlank
    private String name;
    
    /**
     * Контактные данные
     */
    @Basic(optional = false)
    @Column(name = "address")
    @NotBlank
    private String address;
    
    /**
     * Руководитель
     */
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @NotNull
    private Employee director;

    public Subdivision() {
    }

    public Subdivision(Integer id) {
        this.id = id;
    }

    public Subdivision(Integer id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Employee getDirector() {
        return director;
    }

    public void setDirector(Employee director) {
        this.director = director;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Subdivision)) {
            return false;
        }
        Subdivision other = (Subdivision) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.demskv.webassignmenteditor.subdivision.Subdivision[ id=" + id + " ]";
    }

}
