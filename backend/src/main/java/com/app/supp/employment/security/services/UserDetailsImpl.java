package com.app.supp.employment.security.services;

import com.app.supp.employment.models.Candidate;
import com.app.supp.employment.models.Company;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;

    @Getter
    private int id;

    private final String email;

    @JsonIgnore
    private String password;

    @Getter
    private final String role;

    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(int id, String email, String password, String role, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.role = role;
    }

    public static UserDetailsImpl build(Candidate candidate) {
        return new UserDetailsImpl(candidate.getId(), candidate.getEmail(), candidate.getPassword(), candidate.getRole(), null);
    }

    public static UserDetailsImpl build(Company company) {
        return new UserDetailsImpl(company.getId(), company.getEmail(), company.getPassword(), company.getRole(), null);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
