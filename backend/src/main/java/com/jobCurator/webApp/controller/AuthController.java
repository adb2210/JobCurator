package com.jobCurator.webApp.controller;

import com.jobCurator.webApp.dto.SignupRequest;
import com.jobCurator.webApp.dto.LoginRequest;
import com.jobCurator.webApp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try{
            authService.signup(request);
            List<String> processedRoles=runPythonScript(request.getSkills());
            authService.saveProcessedRoles(request.getEmail(),processedRoles);
            return ResponseEntity.ok("User Registered Successfully!");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    private List<String> runPythonScript(Set<String> skills) throws Exception {
        // Convert skills to a comma-separated string
        String skillsString = String.join(",", skills);

        // Use ProcessBuilder to run the Python script
        ProcessBuilder processBuilder = new ProcessBuilder(
                "python", "D:\\JobCurator\\backend\\model.py", skillsString
        );
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        // Read the script's output
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        List<String> output = new ArrayList<>();
        String line;

        while ((line = reader.readLine()) != null) {
            output.addAll(Arrays.asList(line.split(",")));
        }

        // Check the script's exit code
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Python script failed with exit code " + exitCode);
        }

        return output;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try{
            String token=authService.login(request);
            return ResponseEntity.ok(token);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

