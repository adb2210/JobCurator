package com.jobCurator.webApp.controller;

import com.jobCurator.webApp.entity.Job;
import com.jobCurator.webApp.entity.RecommendedJob;
import com.jobCurator.webApp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("recommended/{email}")
    public ResponseEntity<List<RecommendedJob>> getAllRoles(@PathVariable String email){
        List<RecommendedJob> roles=jobService.getAllRoles(email);
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addJob(@RequestBody Job job) {
        try {
            jobService.saveJob(job);
            return ResponseEntity.ok("Job added successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/addMultiple")
    public ResponseEntity<String> addJobs(@RequestBody List<Job> jobs) {
        try {
            jobService.saveJobs(jobs);
            return ResponseEntity.ok("Jobs added successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while adding jobs: " + e.getMessage());
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Job>> filterJobs(
            @RequestParam(defaultValue = "") String role,
            @RequestParam(defaultValue = "") String company,
            @RequestParam(defaultValue = "") String location
    ) {
        List<Job> jobs = jobService.filterJobs(role, company, location);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Job>> getJobs(){
        List<Job> jobs=jobService.getJobs();
        return ResponseEntity.ok(jobs);
    }
}
