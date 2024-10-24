package com.app.supp.employment.repository;

import com.app.supp.employment.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findByEmail(String email);

    Boolean existsByEmail(String email);
}
