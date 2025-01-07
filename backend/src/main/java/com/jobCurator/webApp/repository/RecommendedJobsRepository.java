package com.jobCurator.webApp.repository;

import com.jobCurator.webApp.entity.RecommendedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendedJobsRepository extends JpaRepository<RecommendedJob, Long> {
    List<RecommendedJob> findByEmail(String email);
}