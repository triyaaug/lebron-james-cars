package com.lebronJamesCars.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    private String name;
    private String email;
    private String password;
    // Convert into json later
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Cart cart;
    private String address;
    private String postalCode;
    private String city;
    private String province;
    private String phoneNum;
    private String role;

    public User() {
        this.cart = new Cart();
        this.cart.setUser(this);
    }

    public User(String name, String email, String password, Cart cart,
                String address, String postalCode, String city, String province,
                String phoneNum, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.province = province;
        this.phoneNum = phoneNum;
        this.role = role;
    }

    //methods to implement
    public void writeReview(){

    }

    public void checkout(){

    }





    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long id) {
        this.userId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
