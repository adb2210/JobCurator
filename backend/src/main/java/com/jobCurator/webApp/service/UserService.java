package com.jobCurator.webApp.service;

import com.jobCurator.webApp.dto.PasswordUpdateRequest;
import com.jobCurator.webApp.entity.User;
import com.jobCurator.webApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public User getUserByEmail(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    public void updatePassword(String email, PasswordUpdateRequest passwordUpdateRequest) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(passwordUpdateRequest.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (!passwordUpdateRequest.getNewPassword().equals(passwordUpdateRequest.getConfirmPassword())) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        user.setPassword(passwordEncoder.encode(passwordUpdateRequest.getNewPassword()));
        userRepository.save(user);
    }

    public void updateUserProfile(String email, User user) {
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        // Update profile fields
        existingUser.setName(user.getName());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setGender(user.getGender());
        existingUser.setCity(user.getCity());
        existingUser.setState(user.getState());
        existingUser.setSkills(user.getSkills());

        userRepository.save(existingUser);
    }

    public User updateUser(String email, User updatedUser) {
        User existingUser = getUserByEmail(email);

        // Update fields
        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // Encrypt in production
        }
        if (updatedUser.getGender() != null) {
            existingUser.setGender(updatedUser.getGender());
        }
        if (updatedUser.getCity() != null) {
            existingUser.setCity(updatedUser.getCity());
        }
        if (updatedUser.getState() != null) {
            existingUser.setState(updatedUser.getState());
        }

        // Update skills
        if (updatedUser.getSkills() != null) {
            existingUser.getSkills().clear(); // Clear existing skills
            existingUser.getSkills().addAll(updatedUser.getSkills()); // Add new skills
        }

        return userRepository.save(existingUser);
    }

    public void deleteUserByEmail(String userEmail) {
        if(!userRepository.existsByEmail(userEmail)){
            throw new IllegalArgumentException("User not found!!!");
        }
        userRepository.deleteById(userEmail);
    }
}