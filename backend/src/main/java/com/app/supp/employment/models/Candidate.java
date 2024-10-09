package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Candidate",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = "email")
    })
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    @Getter
    private int id;

    @Setter
    @Getter
    private String email;

    @Setter
    @Getter
    private String firstName;

    @Setter
    @Getter
    private String lastName;

    @Setter
    @Getter
    private String password;

    @Setter
    @Getter
    private String phoneNumber;

    @Setter
    @Getter
    private String city;

    @Setter
    @Getter
    private String description;

    @Setter
    @Getter
    private String photoFilePath;

    @Setter
    @Getter
    private String profession;

    @Setter
    @Getter
    private int age;

    public Candidate() {}

    public Candidate(String email, String firstName, String lastName, String password, String phoneNumber, String city, String description, String photoFilePath, int age, String profession) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.description = description;
        this.photoFilePath = photoFilePath;
        this.age = age;
        this.profession = profession;
    }
}
