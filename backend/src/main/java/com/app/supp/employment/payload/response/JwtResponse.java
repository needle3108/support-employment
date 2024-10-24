package com.app.supp.employment.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {
    private String token;
    private final String type = "Bearer";
    private int id;
    private String username;
    private String role;

    public JwtResponse(String accessToken, int id, String username, String role) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.role = role;
    }
}
