package com.app.supp.employment.repository;

import com.app.supp.employment.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    Candidate findByEmail(String email);

    Boolean existsByEmail(String email);

    Candidate findById(int id);

    List<Candidate> findAllByCity(String city);

    List<Candidate> findAllByProfession(String profession);

    @Query("SELECT u from Candidate  u WHERE u.age >= ?1")
    List<Candidate> findAllWhereAgeGreaterThan(int age);

    @Query("SELECT u from Candidate  u WHERE u.age <= ?1")
    List<Candidate> findAllWhereAgeLessThan(int age);
}

