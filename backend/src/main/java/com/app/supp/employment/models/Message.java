package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int idCandidate;

    private int idCompany;

    private LocalDateTime messageTime;

    private String message;

    public Message() {}

    public Message(int idCandidate, int idCompany, LocalDateTime messageTime, String message) {
        this.idCandidate = idCandidate;
        this.idCompany = idCompany;
        this.messageTime = messageTime;
        this.message = message;
    }
}
