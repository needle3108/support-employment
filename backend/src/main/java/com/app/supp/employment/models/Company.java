package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "company",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })
@Setter
@Getter
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;

    private String name;

    private String lastName;

    private String password;

    private String city;

    private String companyName;

    private String photoFilePath;

    @Column(nullable = false)
    private String role;

    public Company() {}

    public Company(String email, String name, String lastName, String password, String city, String companyName, String photoFilePath) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.city = city;
        this.companyName = companyName;
        this.photoFilePath = photoFilePath;
    }
}
