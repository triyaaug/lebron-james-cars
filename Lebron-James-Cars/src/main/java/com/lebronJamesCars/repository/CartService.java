package com.lebronJamesCars.repository;

import org.springframework.stereotype.Service;
import com.lebronJamesCars.entity.Cart;

@Service
public class CartService {
	  private final CartRepository cartRepository;
	  private final UserRepository userRepository;
	  private final VehicleRepository vehicleRepository;

	 public CartService(CartRepository cartRepository,UserRepository userRepository,
	                     VehicleRepository vehicleRepository) {
	        this.cartRepository = cartRepository;
	        this.userRepository = userRepository;
	        this.vehicleRepository = vehicleRepository;
	 }
	 
	 public Cart createCart(Cart cart) {
		return null;
	 }
	
}
