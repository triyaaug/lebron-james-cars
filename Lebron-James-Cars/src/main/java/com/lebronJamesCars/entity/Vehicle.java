package com.lebronJamesCars.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue
    private long vehicleID;
    private String brand;
    private String shape;
    private int modelYear;
    private String vehicleHistory;
    private int reportedAccident;
    private String reviews;
    private double emissionScore;
    private int stock;
    private double interestRate;
    private double price;
    private double downPayment;
    private int loanDuration; // in months
    private double co2Emission;
    private double fuelUsage;
    private boolean onSale;

    public Vehicle(){

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

    public double getDownPayment() {
        return downPayment;
    }

    public void setDownPayment(double downPayment) {
        this.downPayment = downPayment;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
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

    public int getReportedAccident() {
        return reportedAccident;
    }

    public void setReportedAccident(int reportedAccident) {
        this.reportedAccident = reportedAccident;
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

    public long getVehicleID() {
        return vehicleID;
    }

    public void setVehicleID(long vehicleID) {
        this.vehicleID = vehicleID;
    }
}
