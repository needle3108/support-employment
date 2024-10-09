package com.app.supp.employment.repository;

import com.app.supp.employment.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Optional<Candidate> findByEmail(String email);

    Boolean existsByEmail(String email);
}

