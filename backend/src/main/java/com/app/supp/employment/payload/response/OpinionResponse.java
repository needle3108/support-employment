package com.app.supp.employment.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OpinionResponse {
    private int id;
    private String name;
    private String lastName;
    private String companyName;
    private byte[] image;
    private LocalDateTime dateTime;
    private String opinion;

    public OpinionResponse(int id, String name, String lastName, String companyName, byte[] image, LocalDateTime dateTime, String opinion) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.companyName = companyName;
        this.image = image;
        this.dateTime = dateTime;
        this.opinion = opinion;
    }
}
