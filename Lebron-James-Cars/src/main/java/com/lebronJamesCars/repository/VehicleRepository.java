package com.lebronJamesCars.repository;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.lebronJamesCars.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

//	//filters
//    List<Vehicle> findByBrand(String brand);
//    List<Vehicle> findByShape(String shape);
//    List<Vehicle> findByModelYear(int modelYear);
//    List<Vehicle> findByVehicleHistory(String vehicleHistory);
//    List<Vehicle> findByHotDeals(boolean onSale);
//
//
//    
//    //sorting (price, mileage)
//    List<Vehicle> findAll(Sort sort);


}
