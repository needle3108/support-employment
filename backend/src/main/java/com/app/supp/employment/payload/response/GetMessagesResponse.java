package com.app.supp.employment.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class GetMessagesResponse {
    private int id;
    private String message;
    private LocalDateTime timestamp;
    private String sender;

    public GetMessagesResponse(int id, String message, LocalDateTime timestamp, String sender) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.sender = sender;
    }
}
