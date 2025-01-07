package com.jobCurator.webApp.repository;

import com.jobCurator.webApp.entity.Bookmark;
import com.jobCurator.webApp.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    // Fetch all bookmarks for a user
    List<Bookmark> findByUserEmail(String email);

    // Check if a bookmark exists
    boolean existsByUserEmailAndJobId(String email, Long jobId);

    // Fetch a specific bookmark by user and job IDs
    Optional<Bookmark> findByUserEmailAndJobId(String email, Long jobId);

    @Query("SELECT j FROM Job j JOIN Bookmark b ON j.id = b.job.id WHERE b.user.email = :email")
    List<Job> findBookmarkedJobsByUserEmail(@Param("email") String email);
}
