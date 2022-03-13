package com.demskv.webassignmenteditor.organization;

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
 * Organization (Организация) entity class.
 * @author demskv
 */
@Entity
@Table(name = "organization")
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    /**
     * Наименование организации
     */
    @Basic(optional = false)
    @Column(name = "name")
    @NotBlank
    private String name;
    
    /**
     * Физический адрес
     */
    @Basic(optional = false)
    @Column(name = "phys_address")
    @NotBlank
    private String physAddress;
    
    /**
     * Юридический адрес
     */
    @Basic(optional = false)
    @Column(name = "yur_address")
    @NotBlank
    private String yurAddress;
    
    /**
     * Руководитель
     */
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    @NotNull
    private Employee director;

    public Organization() {
    }

    public Organization(Integer id) {
        this.id = id;
    }

    public Organization(Integer id, String name, String physAddress, String yurAddress) {
        this.id = id;
        this.name = name;
        this.physAddress = physAddress;
        this.yurAddress = yurAddress;
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

    public String getPhysAddress() {
        return physAddress;
    }

    public void setPhysAddress(String physAddress) {
        this.physAddress = physAddress;
    }

    public String getYurAddress() {
        return yurAddress;
    }

    public void setYurAddress(String yurAddress) {
        this.yurAddress = yurAddress;
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
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Organization)) {
            return false;
        }
        Organization other = (Organization) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.demskv.webassignmenteditor.organization.Organization[ id=" + id + " ]";
    }

}
