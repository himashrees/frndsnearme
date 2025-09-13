package com.example.location.repository;

import java.util.List;

import com.example.location.entity.Location;
import com.example.location.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository

public interface LoginRepository extends JpaRepository<Location, Integer> {
	
	 
	@Query(value="SELECT DISTINCT u.username, l.name, l.latitude, l.longitude, l.mobile_number, "
    		+ "(6371 * ACOS(COS(RADIANS(?1)) * COS(RADIANS(l.latitude)) * COS(RADIANS(l.longitude) "
    		+ "- RADIANS(?2)) + SIN(RADIANS(?1)) * SIN(RADIANS(l.latitude)))) "
    		+ "AS distance FROM users u JOIN locations l ON u.user_id = l.id WHERE (6371 * ACOS(COS(RADIANS(?1))"
    		+ " * COS(RADIANS(l.latitude)) * COS(RADIANS(l.longitude) - RADIANS(?2)) + SIN(RADIANS(?1)) * "
    		+ "SIN(RADIANS(l.latitude)))) < ?3 ORDER BY distance", nativeQuery = true)
    List<Object[]> findUsersNearby(double lat, double lon, String distance);
    
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
	List<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    
    
    }

    




