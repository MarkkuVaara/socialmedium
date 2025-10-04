package com.markkuvaara.mediasocial.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String director;

    private List<String> actors;

    @Column(name = "\"year\"")
    private Integer year;

    @Column(name = "\"length\"")
    private Integer length;

    // Constructors

    public Video() {
    }

    public Video(String name, String type, String director, List<String> actors, Integer year, Integer length) {
        this.name = name;
        this.type = type;
        this.director = director;
        this.actors = actors;
        this.year = year;
        this.length = length;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

}
