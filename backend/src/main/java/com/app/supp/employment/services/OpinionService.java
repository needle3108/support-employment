package com.app.supp.employment.services;

import com.app.supp.employment.models.Opinion;
import com.app.supp.employment.repository.OpinionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class OpinionService {
    @Autowired
    private OpinionRepository opinionRepository;

    public List<Opinion> findAllByIdCandidate(int idCandidate) {
        return opinionRepository.findAllByIdCandidate(idCandidate);
    }

    public boolean addOpinion(int idCandidate, int idCompany, String opinion) {
        try{
            ZoneId zone = ZoneId.of("Europe/Warsaw");

            opinionRepository.save(new Opinion(idCandidate, idCompany, LocalDateTime.now(zone), opinion));

            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
