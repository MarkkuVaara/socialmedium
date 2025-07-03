package com.markkuvaara.mediasocial.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class View {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long videoid;

    private Long userid;

    private Long partid;

    private Long episodeid;

    private LocalDateTime date;

    // Constructors

    public View() {
    }

    public View(Long videoid, Long userid, Long partid, Long episodeid, LocalDateTime date) {
        this.videoid = videoid;
        this.userid = userid;
        this.partid = partid;
        this.episodeid = episodeid;
        this.date = date;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getVideoid() {
        return videoid;
    }

    public void setVideoid(Long videoid) {
        this.videoid = videoid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getPartid() {
        return partid;
    }

    public void setPartid(Long partid) {
        this.partid = partid;
    }

    public Long getEpisodeid() {
        return episodeid;
    }

    public void setEpisodeid(Long episodeid) {
        this.episodeid = episodeid;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

}
