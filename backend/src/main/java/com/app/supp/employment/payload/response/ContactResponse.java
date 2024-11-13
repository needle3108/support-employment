package com.app.supp.employment.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactResponse {
    private int id;
    private String firstName;
    private String lastName;
    private byte[] image;

    public ContactResponse(int id, String firstName, String lastName, byte[] image) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
    }
}
