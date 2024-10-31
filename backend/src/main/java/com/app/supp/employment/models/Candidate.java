package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.sql.Blob;

@Entity
@Table(name = "Candidate",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = "email")
    })
@Getter
@Setter
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;

    private String firstName;

    private String lastName;

    private String password;

    private String phoneNumber;

    private String city;

    private String description;

    @Lob
    @Column(name = "photo_file_path", columnDefinition = "LONGBLOB")
    private byte[] photoFilePath;

    private String profession;

    private int age;

    @Column(nullable = false)
    private String role;

    public Candidate() {}

    public Candidate(String email, String firstName, String lastName, String password, String phoneNumber, String city, String description, byte[] photoFilePath, int age, String profession) {
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
