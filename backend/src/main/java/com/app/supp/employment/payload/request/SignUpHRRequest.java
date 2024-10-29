package com.app.supp.employment.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
public class SignUpHRRequest implements Serializable {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String lastName;

    @NotBlank
    private String city;

    @NotBlank
    private String companyName;

    private MultipartFile file;
}
