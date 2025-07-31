
package com.markkuvaara.mediasocial.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Userdata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userid;

    private String email;

    private String address;

    private String addressnumber;

    private String city;

    private LocalDateTime birthdate;

    // Constructors

    public Userdata() {
    }

    public Userdata(Long userid, String email, String address, String addressnumber, String city,
            LocalDateTime birthdate) {

        this.userid = userid;
        this.email = email;
        this.address = address;
        this.addressnumber = addressnumber;
        this.city = city;
        this.birthdate = birthdate;

    }

    // Getters and Setters

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressnumber() {
        return addressnumber;
    }

    public void setAddressnumber(String addressnumber) {
        this.addressnumber = addressnumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public LocalDateTime getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDateTime birthdate) {
        this.birthdate = birthdate;
    }

}
