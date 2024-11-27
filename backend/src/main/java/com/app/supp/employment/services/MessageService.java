package com.app.supp.employment.services;

import com.app.supp.employment.models.Message;
import com.app.supp.employment.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getUserMessages(int id, String role){
        if (role.equals("USER")){
            return messageRepository.findAllByIdCandidate(id);
        }
        return messageRepository.findAllByIdCompany(id);
    }

    public List<Message> getUserMessagesWithSpecifiedCompany(int idCandidate, int idCompany){
        return messageRepository.findAllByIdCompanyAndIdCandidate(idCompany ,idCandidate);
    }

    public boolean addMessage(int idCandidate, int idCompany, String message, String sender){
        try{
            ZoneId zone = ZoneId.of("Europe/Warsaw");

            messageRepository.save(new Message(idCandidate, idCompany, LocalDateTime.now(zone), message, sender));
            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
