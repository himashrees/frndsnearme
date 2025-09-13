package com.example.location.repository;

import java.util.List;

import com.example.location.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

	@Repository
    public interface UserRepository extends JpaRepository<User, Long> {
        // method to retrieve all users
        List<User> findAll();
}
