package com.jobCurator.webApp.service;

import com.jobCurator.webApp.entity.Bookmark;
import com.jobCurator.webApp.entity.Job;
import com.jobCurator.webApp.entity.User;
import com.jobCurator.webApp.repository.BookmarkRepository;
import com.jobCurator.webApp.repository.JobRepository;
import com.jobCurator.webApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    public void saveBookmark(String email, Long jobId) {
        if (!bookmarkRepository.existsByUserEmailAndJobId(email, jobId)) {
            User user = userRepository.findById(email)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Job job = jobRepository.findById(jobId)
                    .orElseThrow(() -> new IllegalArgumentException("Job not found"));

            Bookmark bookmark = new Bookmark();
            bookmark.setUser(user);
            bookmark.setJob(job);
            bookmarkRepository.save(bookmark);
        } else {
            throw new IllegalArgumentException("Job is already bookmarked by the user");
        }
    }

    public List<Bookmark> getBookmarksForUser(String email) {

        return bookmarkRepository.findByUserEmail(email);
    }

    public void removeBookmark(String email, Long jobId) {
        Bookmark bookmark = bookmarkRepository.findByUserEmailAndJobId(email, jobId)
                .orElseThrow(() -> new IllegalArgumentException("Bookmark not found"));

        bookmarkRepository.delete(bookmark);
    }

    public boolean checkBookmark(String email, Long jobId) {
        return bookmarkRepository.existsByUserEmailAndJobId(email,jobId);
    }

    public List<Job> getBookmarkedJobs(String email) {
        return bookmarkRepository.findBookmarkedJobsByUserEmail(email);
    }
}
