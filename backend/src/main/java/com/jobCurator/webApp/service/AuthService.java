package com.jobCurator.webApp.service;

import com.jobCurator.webApp.dto.SignupRequest;
import com.jobCurator.webApp.dto.LoginRequest;
import com.jobCurator.webApp.entity.RecommendedJob;
import com.jobCurator.webApp.entity.User;
import com.jobCurator.webApp.repository.RecommendedJobsRepository;
import com.jobCurator.webApp.repository.UserRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RecommendedJobsRepository recommendedJobsRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public void signup(SignupRequest request) {
        if (userRepository.findById(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered!");
        }

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setGender(request.getGender());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setSkills(request.getSkills());

        userRepository.save(user);
    }

    public void saveProcessedRoles(String email, List<String> processedRoles){
        for(String job:processedRoles){
            if(job.length()>255){
                System.out.println("warning"+job);
            }
            String truncatedJob=job.length()>255?job.substring(0,255):job;
            RecommendedJob recJob=new RecommendedJob();
            recJob.setUserEmail(email);
            recJob.setJobTitle(job);
            recommendedJobsRepository.save(recJob);
        }
    }

    public String login(LoginRequest request) {
        User user = userRepository.findById(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials!");
        }

        return jwtUtil.generateToken(request.getEmail());
    }

    public List<String> getRecommendedJobs(Set<String> skills) throws Exception {
        // Convert skills to a comma-separated string
        String skillsString = String.join(",", skills);

        // Use ProcessBuilder to run the Python script
        ProcessBuilder processBuilder = new ProcessBuilder(
                "python3", "D:\\New folder (2)\\webApp\\model.py", skillsString
        );
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        // Read output from the Python script
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        List<String> output = new ArrayList<>();
        String line;

        while ((line = reader.readLine()) != null) {
            output.add(line); // Each line is a recommended job
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Python script failed with exit code " + exitCode);
        }

        return output;
    }
}
