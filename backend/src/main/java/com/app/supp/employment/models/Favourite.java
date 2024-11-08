package com.app.supp.employment.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "favourites")
@Getter
@Setter
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int idCandidate;

    @Column(nullable = false)
    private int idCompany;

    public Favourite() {}

    public Favourite(int idCandidate, int idCompany) {
        this.idCandidate = idCandidate;
        this.idCompany = idCompany;
    }
}
