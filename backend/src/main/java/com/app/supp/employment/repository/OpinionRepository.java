package com.app.supp.employment.repository;

import com.app.supp.employment.models.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpinionRepository extends JpaRepository<Opinion, Integer> {
    List<Opinion> findAllByIdCandidate(int idCandidate);
}
