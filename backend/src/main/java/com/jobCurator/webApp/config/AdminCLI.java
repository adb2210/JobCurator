package com.jobCurator.webApp.config;

import com.jobCurator.webApp.service.JobService;
import com.jobCurator.webApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminCLI implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private JobService jobService;

    @Override
    public void run(String... args) {
        if (args.length == 0) {
            System.out.println("No command provided. Use 'deleteUser' or 'deleteJob'.");
            return;
        }

        String command = args[0];

        try {
            switch (command.toLowerCase()) {
                case "deleteuser":
                    if (args.length < 2) {
                        System.out.println("Usage: deleteUser <email>");
                        break;
                    }
                    String userEmail = args[1];
                    userService.deleteUserByEmail(userEmail);
                    System.out.println("User with email " + userEmail + " deleted successfully.");
                    break;

                case "deletejob":
                    if (args.length < 2) {
                        System.out.println("Usage: deleteJob <jobId>");
                        break;
                    }
                    Long jobId = Long.parseLong(args[1]);
                    jobService.deleteJobById(jobId);
                    System.out.println("Job with ID " + jobId + " deleted successfully.");
                    break;

                default:
                    System.out.println("Unknown command: " + command);
                    System.out.println("Available commands: deleteUser, deleteJob");
            }
        } catch (Exception e) {
            System.err.println("Error executing command: " + e.getMessage());
            e.printStackTrace();
        }
    }
}