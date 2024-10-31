package com.app.supp.employment.payload.response;

import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.ByteArrayResource;

@Setter
@Getter
public class UserProfileResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private ByteArrayResource file;
    private String description;
    private String profession;

    public UserProfileResponse(String firstName, String lastName, String phoneNumber, String email, ByteArrayResource file, String description, String profession) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.file = file;
        this.description = description;
        this.profession = profession;
    }
}
