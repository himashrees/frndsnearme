package com.example.location.controller;

import java.util.List;

import com.example.location.entity.Location;
import com.example.location.entity.User;
import com.example.location.exception.*;
import com.example.location.repository.LoginRepository;
import com.example.location.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("*")

@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LoginRepository loginRepository;
   
    
   
    
    @PostMapping("/userlogin")
	  public String login(@RequestBody User user) {
	    List<User> foundUsers = loginRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());

	    if (foundUsers.size() == 1) {
	      return "Login successful!";
	    } else {
	      throw new UnauthorizedException("Invalid credentials");
	    
	  }}
    
   


@GetMapping("/users/nearby/{lat}/{lon}/{distance}")
public ResponseEntity<List<Object[]>> getUsersNearby(
        @PathVariable("lat") double lat,
        @PathVariable("lon") double lon,
        @PathVariable("distance") String distance) {

    List<Object[]> nearbyUsers = loginRepository.findUsersNearby(lat, lon, distance);

    if (nearbyUsers.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } else {
        return new ResponseEntity<>(nearbyUsers, HttpStatus.OK);
    }
}
}