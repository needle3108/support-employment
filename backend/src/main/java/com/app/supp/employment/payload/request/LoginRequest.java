package com.app.supp.employment.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
