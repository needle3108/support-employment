package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "opinions")
@Getter
@Setter
public class Opinion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int idCandidate;

    private int idCompany;

    private LocalDateTime opinionTime;

    private String opinion;

    public Opinion() {}

    public Opinion(int idCandidate, int idCompany, LocalDateTime opinionTime,  String opinion) {
        this.idCandidate = idCandidate;
        this.idCompany = idCompany;
        this.opinionTime = opinionTime;
        this.opinion = opinion;
    }
}
