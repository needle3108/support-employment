package com.app.supp.employment.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String city;

    private int age;

    private String description;

    @NotBlank
    private String phoneNumber;

    @NotBlank
    private String profession;

    private String photoFilePath;
}
