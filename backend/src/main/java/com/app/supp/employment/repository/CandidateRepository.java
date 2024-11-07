package com.app.supp.employment.repository;

import com.app.supp.employment.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Candidate findByEmail(String email);

    Boolean existsByEmail(String email);

    Candidate findById(int id);
}

