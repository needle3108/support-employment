package com.app.supp.employment.payload.response;

import com.app.supp.employment.models.Candidate;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FilterResponse {
    private List<Candidate> candidates;
    private List<Candidate> favourites;

    public FilterResponse(List<Candidate> candidates, List<Candidate> favourites) {
        this.candidates = candidates;
        this.favourites = favourites;
    }
}
