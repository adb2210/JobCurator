package com.jobCurator.webApp.controller;

import com.jobCurator.webApp.dto.PasswordUpdateRequest;
import com.jobCurator.webApp.entity.User;
import com.jobCurator.webApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Fetch user details
    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Update user details
    @PutMapping("/update/{email}")
    public ResponseEntity<User> updateUser(@PathVariable String email, @RequestBody User updatedUser) {
        try {
            User user = userService.updateUser(email, updatedUser);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/update-password/{email}")
    public ResponseEntity<String> updatePassword(@PathVariable String email, @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        try {
            userService.updatePassword(email, passwordUpdateRequest);
            return ResponseEntity.ok("Password updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating password: " + e.getMessage());
        }
    }

    @PostMapping("/update/{email}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String email, @RequestBody User user) {
        try {
            userService.updateUserProfile(email, user);
            return ResponseEntity.ok("Profile updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating profile: " + e.getMessage());
        }
    }
}