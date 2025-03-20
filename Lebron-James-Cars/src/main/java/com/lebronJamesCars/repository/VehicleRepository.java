package com.lebronJamesCars.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lebronJamesCars.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>  {

}
