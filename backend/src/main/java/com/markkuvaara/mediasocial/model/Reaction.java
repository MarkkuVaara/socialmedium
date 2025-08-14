package com.markkuvaara.mediasocial.model;

import jakarta.persistence.*;

@Entity
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long commentId;

    private String type;

    private Long amount;

    // Constructors

    public Reaction() {
    }

    public Reaction(Long commentId, String type, Long amount) {
        this.commentId = commentId;
        this.type = type;
        this.amount = amount;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
