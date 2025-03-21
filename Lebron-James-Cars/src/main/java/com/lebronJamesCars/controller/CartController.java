package com.lebronJamesCars.controller;


import org.springframework.web.bind.annotation.*;

import com.lebronJamesCars.entity.Cart;
import com.lebronJamesCars.service.CartService;

@RestController
@RequestMapping("/users/{userId}/cart")
public class CartController {
	
	private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    
 // Get user's cart
    @GetMapping
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }
    
    @PostMapping("/{vehicleId}")
    public Cart addToCart(
            @PathVariable Long userId,
            @PathVariable Long vehicleId) {
        return cartService.addVehicleToCart(userId, vehicleId);
    }
   
    
}
