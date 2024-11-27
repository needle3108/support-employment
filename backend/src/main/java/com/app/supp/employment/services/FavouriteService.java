package com.app.supp.employment.services;

import com.app.supp.employment.models.Favourite;
import com.app.supp.employment.repository.FavouriteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {
    @Autowired
    private FavouriteRepository favouriteRepository;

    public boolean addFavourite(int idCompany, int idCandidate) {
        try{
            if (favouriteRepository.existsByIdCandidateAndIdCompany(idCandidate, idCompany)) {
                return false;
            }

            favouriteRepository.save(new Favourite(idCandidate, idCompany));

            return true;
        }
        catch(Exception e){
            return false;
        }
    }

    public List<Favourite> getFavourites(int idCompany) {
        return favouriteRepository.findAllByIdCompany(idCompany);
    }

    public boolean isUserFavourite(int idCandidate, int idCompany) {
        return favouriteRepository.existsByIdCandidateAndIdCompany(idCandidate, idCompany);
    }

    @Transactional
    public boolean removeFavourite(int idCandidate, int idCompany) {
        try{
            favouriteRepository.deleteByIdCandidateAndIdCompany(idCandidate, idCompany);
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
