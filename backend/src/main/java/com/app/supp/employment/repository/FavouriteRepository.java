package com.app.supp.employment.repository;

import com.app.supp.employment.models.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {
    List<Favourite> findAllByIdCompany(int idCompany);
}
