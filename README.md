# Job Curator

## Overview
Job Curator is a web application designed to help users find and apply for jobs that match their skills. The project integrates backend services built with Spring Boot, a frontend built with React, and a machine learning model for job recommendations. The application includes features such as user authentication, job bookmarking, and skill-based job recommendations.

---

## Features
- User Authentication: Secure signup and login using JWT for token-based authentication.
- Job Search: A centralized platform to browse and apply for job listings.
- Job Recommendations: A machine learning model provides personalized job recommendations based on user skills.
- Bookmarking: Users can save and manage job bookmarks for future reference.
- Web Scraping Integration: Automatically scrapes and stores job listings in the database.

---

## Technologies Used
### Backend
- Spring Boot: For developing REST APIs.
- PostgreSQL: Relational database for storing user data, jobs, and bookmarks.
- Spring Security: For securing APIs and implementing JWT-based authentication.
- JPA/Hibernate: For interacting with the database.
- Python: For running the machine learning job recommendation script.

### Frontend
- React: For building a user-friendly interface.
- Axios: For making API requests.

### Others
- Git/GitHub: For version control and collaboration.
- Job Scraper: A custom Python script to scrape job listings from various platforms.
- Machine Learning Model: Built using scikit-learn to recommend jobs based on user-entered skills.

---

## Project Architecture
### Three-Layer Architecture:
1. Controller Layer:
   - Handles incoming HTTP requests and maps them to appropriate services.
   - Example: UserController, JobController.

2. Service Layer:
   - Contains business logic and communicates between controllers and repositories.
   - Example: AuthService, JobService.

3. Repository Layer:
   - Interacts directly with the database using JPA/Hibernate.
   - Example: UserRepository, JobRepository.

---

## Setup Instructions
### Prerequisites
- Java (JDK 11 or higher)
- Node.js and npm
- Python (for running the recommendation script)
- PostgreSQL

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/adb2210/Job-Curator.git
   cd Job-Curator/backend
   ```
2. Configure the `application.properties` file with your PostgreSQL credentials.
3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## Future Enhancements
- Advanced filtering options for job search.
- Real-time notifications for new job postings.
- Integration with external APIs for enhanced data.
- User profile management.

---
