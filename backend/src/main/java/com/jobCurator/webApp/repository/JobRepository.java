package com.jobCurator.webApp.repository;

import com.jobCurator.webApp.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    boolean existsByJobUrl(String jobUrl);

    @Query("SELECT j FROM Job j " +
            "WHERE (:role IS NULL OR j.role ILIKE CONCAT('%', :role, '%')) " +
            "AND (:company IS NULL OR j.company ILIKE CONCAT('%', :company, '%')) " +
            "AND (:location IS NULL OR j.location ILIKE CONCAT('%', :location, '%'))")
    List<Job> filterJobs(String role, String company, String location);
}
