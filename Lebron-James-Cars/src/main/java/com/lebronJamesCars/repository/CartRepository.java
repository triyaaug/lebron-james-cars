package com.lebronJamesCars.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lebronJamesCars.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	
}