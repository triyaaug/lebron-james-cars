package com.lebronJamesCars.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {
	
    @Id //marks field as primary key of each vehicle entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tells JPA that primary key should be auto generated by db
    private Long vehicleID;
    
    @Column(name = "brand", nullable = false)
    private String brand;
    @Column(name = "shape")
    private String shape;
    @Column(name = "vehicleHistory")
    private String vehicleHistory; //like accidents
    @Column(name = "reviews")
    private String reviews;
    
    @Column(name = "modelYear", nullable = false)
    private int modelYear;
    @Column(name = "stock", nullable = false)
    private int stock;
    @Column(name = "loanDuration")
    private int loanDuration; // in months

    @Column(name = "emissionScore")
    private double emissionScore;
    @Column(name = "interestRate")
    private BigDecimal interestRate;
    @Column(name = "price", nullable = false)
    private BigDecimal price;
    @Column(name = "co2Emission")
    private double co2Emission;
    @Column(name = "fuelUsage")
    private double fuelUsage;
    
    @Column(name = "onSale")
    private boolean onSale;

    public Vehicle(){

    }
    
    public Vehicle(String brand, String shape, String vehicleHistory, String reviews, 
    		int modelYear, int stock, int loanDuration, double emissionScore, BigDecimal interestRate, BigDecimal price, 
    		 double co2Emission, double fuelUsage, boolean onSale) {
    	
    	this.brand = brand;
    	this.shape = shape;
    	this.vehicleHistory = vehicleHistory;
    	this.reviews = reviews;
    	this.modelYear = modelYear;
    	this.stock = stock;
    	this.loanDuration = loanDuration;
    	this.emissionScore = emissionScore;
    	this.interestRate = interestRate;
    	this.price = price;
    	this.co2Emission = co2Emission;
    	this.fuelUsage = fuelUsage;
    	this.onSale = onSale;
    	
    }

    public void calculateLoan(){}





    public boolean isOnSale() {
        return onSale;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
    }

    public double getFuelUsage() {
        return fuelUsage;
    }

    public void setFuelUsage(double fuelUsage) {
        this.fuelUsage = fuelUsage;
    }

    public double getCo2Emission() {
        return co2Emission;
    }

    public void setCo2Emission(double co2Emission) {
        this.co2Emission = co2Emission;
    }

    public int getLoanDuration() {
        return loanDuration;
    }

    public void setLoanDuration(int loanDuration) {
        this.loanDuration = loanDuration;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getEmissionScore() {
        return emissionScore;
    }

    public void setEmissionScore(double emissionScore) {
        this.emissionScore = emissionScore;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }


    public String getVehicleHistory() {
        return vehicleHistory;
    }

    public void setVehicleHistory(String vehicleHistory) {
        this.vehicleHistory = vehicleHistory;
    }

    public int getModelYear() {
        return modelYear;
    }

    public void setModelYear(int modelYear) {
        this.modelYear = modelYear;
    }

    public String getShape() {
        return shape;
    }

    public void setShape(String shape) {
        this.shape = shape;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Long getVehicleID() {
        return vehicleID;
    }

    public void setVehicleID(Long vehicleID) {
        this.vehicleID = vehicleID;
    }
}
