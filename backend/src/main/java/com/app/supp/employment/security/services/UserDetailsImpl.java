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

    @Getter
    private final String email;

    @JsonIgnore
    private String password;

    @Getter
    private final String role;

    @Getter
    private String firstName;

    @Getter
    private String lastName;

    @Getter
    private String phoneNumber;

    @Getter
    private String description;

    @Getter
    private String profession;

    @Getter
    private byte[] photoFilePath;

    @Getter
    private String companyName;

    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(int id, String email, String password, String role, String firstName, String lastName, String phoneNumber, String description, String profession, byte[] photoFilePath, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.profession = profession;
        this.photoFilePath = photoFilePath;
    }

    public UserDetailsImpl(int id, String email, String password, String role, String firstName, String lastName, byte[] photoFilePath, String companyName, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoFilePath = photoFilePath;
        this.companyName = companyName;
    }

    public static UserDetailsImpl build(Candidate candidate) {
        return new UserDetailsImpl(candidate.getId(), candidate.getEmail(), candidate.getPassword(), candidate.getRole(), candidate.getFirstName(), candidate.getLastName(), candidate.getPhoneNumber(), candidate.getDescription(), candidate.getProfession(), candidate.getPhotoFilePath(),null);
    }

    public static UserDetailsImpl build(Company company) {
        return new UserDetailsImpl(company.getId(), company.getEmail(), company.getPassword(), company.getRole(), company.getName(), company.getLastName(), company.getPhotoFilePath(), company.getCompanyName(), null);
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
