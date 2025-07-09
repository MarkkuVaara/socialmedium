package com.markkuvaara.mediasocial.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long viewid;

    private Long userid;

    private Long prevcomment;

    private LocalDateTime date;

    private String title;

    private String message;

    // Constructors

    public Comment() {
    }

    public Comment(Long viewid, Long userid, Long prevcomment, LocalDateTime date, String title, String message) {
        this.viewid = viewid;
        this.userid = userid;
        this.prevcomment = prevcomment;
        this.date = date;
        this.title = title;
        this.message = message;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getViewid() {
        return viewid;
    }

    public void setViewid(Long viewid) {
        this.viewid = viewid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getPrevcomment() {
        return prevcomment;
    }

    public void setPrevcomment(Long prevcomment) {
        this.prevcomment = prevcomment;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
