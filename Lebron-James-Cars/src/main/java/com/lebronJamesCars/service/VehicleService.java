package com.lebronJamesCars.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.lebronJamesCars.entity.Vehicle;
import com.lebronJamesCars.repository.VehicleRepository;


@Service
public class VehicleService {

	private final VehicleRepository vehicleRepository;
	
	public VehicleService(VehicleRepository vehicleRepository) {
		this.vehicleRepository = vehicleRepository;
	}
	
	public List<Vehicle> getAllVehicles(){
		return vehicleRepository.findAll();
	}
	
    // Get all vehicles with sorting
    public List<Vehicle> getAllVehicles(String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return vehicleRepository.findAll(sort);
    }
    
    //filters
    //brand
    public List<Vehicle> getVehiclesByBrand(String brand) {
        return vehicleRepository.findByBrand(brand);
    }
    //shape
    public List<Vehicle> getVehiclesByShape(String shape) {
        return vehicleRepository.findByShape(shape);
    }
    //model year
    public List<Vehicle> getVehiclesByModelYear(int modelYear) {
        return vehicleRepository.findByModelYear(modelYear);
    }
    //vehicle history
    public List<Vehicle> getVehiclesByVehicleHistory(String vehicleHistory){
    	return vehicleRepository.findByVehicleHistory(vehicleHistory);
    }
    //hot deals
    public List<Vehicle> getVehiclesByOnSale(boolean onSale){
    	return vehicleRepository.findByOnSale(onSale);
    }
    
    
    
    
	
	public Optional<Vehicle> getVehicleById(Long id){
		return vehicleRepository.findById(id);
	}
	
	public Vehicle createVehicle(Vehicle vehicle) {
		return vehicleRepository.save(vehicle);
	}
	
	public Optional<Vehicle> updateVehicle(Long id, Vehicle newVehicle){
		return vehicleRepository.findById(id).map(vehicle ->{
			vehicle.setBrand(newVehicle.getBrand());
			vehicle.setShape(newVehicle.getShape());
			vehicle.setVehicleHistory(newVehicle.getVehicleHistory());
			vehicle.setReviews(newVehicle.getReviews());
			vehicle.setModelYear(newVehicle.getModelYear());
			vehicle.setStock(newVehicle.getStock());
			vehicle.setLoanDuration(newVehicle.getLoanDuration());
			vehicle.setEmissionScore(newVehicle.getEmissionScore());
			vehicle.setInterestRate(newVehicle.getInterestRate());
			vehicle.setPrice(newVehicle.getPrice());
			vehicle.setCo2Emission(newVehicle.getCo2Emission());
			vehicle.setFuelUsage(newVehicle.getFuelUsage());
			vehicle.setOnSale(newVehicle.isOnSale());
			vehicle.setMileage(newVehicle.getMileage());
			return vehicleRepository.save(vehicle);
		});
	}
	
	public boolean deleteVehicle(Long id) {
		if (vehicleRepository.existsById(id)) {
			vehicleRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
	public BigDecimal getLoanAmount(Long id) {
	    return vehicleRepository.findById(id).map(Vehicle::calculateLoan).orElse(BigDecimal.ZERO);
	}
}
