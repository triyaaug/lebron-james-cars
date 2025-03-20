package com.lebronJamesCars.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lebronJamesCars.entity.Vehicle;
import com.lebronJamesCars.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
	
	private final VehicleService vehicleService;
	
	public VehicleController(VehicleService vehicleService) {
		this.vehicleService = vehicleService;
	}
	
	@GetMapping
	public List<Vehicle> getAllUsers(){
		return vehicleService.getAllVehicles();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Vehicle> getVehicleById(@PathVariable Long id){
		Optional<Vehicle> vehicle = vehicleService.getVehicleById(id);
		return vehicle.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle){
		Vehicle savedVehicle = vehicleService.createVehicle(vehicle);
		return ResponseEntity.ok(savedVehicle);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Vehicle> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicle){
		Optional<Vehicle> updatedVehicle = vehicleService.updateVehicle(id, vehicle);
		return updatedVehicle.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteVehicle(@PathVariable Long id){
		if (vehicleService.deleteVehicle(id)) {
			return ResponseEntity.noContent().build();
		}else {
			return ResponseEntity.notFound().build();
		}
	}

}
