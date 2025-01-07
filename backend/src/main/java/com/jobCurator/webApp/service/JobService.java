package com.jobCurator.webApp.service;

import com.jobCurator.webApp.entity.Job;
import com.jobCurator.webApp.entity.RecommendedJob;
import com.jobCurator.webApp.repository.JobRepository;
import com.jobCurator.webApp.repository.RecommendedJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private RecommendedJobsRepository recommendedJobsRepository;

    public List<RecommendedJob> getAllRoles(String email) {
        return recommendedJobsRepository.findByEmail(email);
    }

    public void saveJob(Job job) {
        if (!jobRepository.existsByJobUrl(job.getJobUrl())) {
            jobRepository.save(job);
        } else {
            throw new IllegalArgumentException("Job with this URL already exists: " + job.getJobUrl());
        }
    }

    public void saveJobs(List<Job> jobs) {
        for (Job job : jobs) {
            if (!jobRepository.existsByJobUrl(job.getJobUrl())) {
                jobRepository.save(job);
            }
        }
    }

    public List<Job> filterJobs(String role, String company, String location) {
        // Call the repository method with optional parameters
        return jobRepository.filterJobs(role, company, location);
    }
    public List<Job> getJobs(){
        return  jobRepository.findAll();
    }

    public void deleteJobById(Long jobId) {
        if(!jobRepository.existsById(jobId)){
            throw new IllegalArgumentException("Job not found!!!");
        }
        jobRepository.deleteById(jobId);
    }
}
