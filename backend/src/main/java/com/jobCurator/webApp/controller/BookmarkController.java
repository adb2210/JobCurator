package com.jobCurator.webApp.controller;

import com.jobCurator.webApp.entity.Bookmark;
import com.jobCurator.webApp.entity.Job;
import com.jobCurator.webApp.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @PostMapping("/{email}/{jobId}")
    public ResponseEntity<String> saveBookmark(@PathVariable String email, @PathVariable Long jobId) {
        try {
            bookmarkService.saveBookmark(email, jobId);
            return ResponseEntity.ok("Job bookmarked successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check/{email}/{jobId}")
    public ResponseEntity<Map<String,Boolean>> checkBookmark(@PathVariable String email, @PathVariable Long jobId){
        boolean isBookMarked=bookmarkService.checkBookmark(email,jobId);
        Map<String,Boolean> response=new HashMap<>();
        response.put("isBookmarked", isBookMarked);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<Bookmark>> getBookmarks(@PathVariable String email) {
        List<Bookmark> bookmarks = bookmarkService.getBookmarksForUser(email);
        return ResponseEntity.ok(bookmarks);
    }

    @GetMapping("/jobs/{email}")
    public ResponseEntity<List<Job>> getBookmarkedJobs(@PathVariable String email){
        List<Job> bookmarkedJobs=bookmarkService.getBookmarkedJobs(email);
        return ResponseEntity.ok(bookmarkedJobs);
    }

    @DeleteMapping("/{email}/{jobId}")
    public ResponseEntity<String> removeBookmark(@PathVariable String email, @PathVariable Long jobId) {
        try {
            bookmarkService.removeBookmark(email, jobId);
            return ResponseEntity.ok("Bookmark removed successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
