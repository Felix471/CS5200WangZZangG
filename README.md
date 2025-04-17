# CS5200WangZZangG

CS5200 Database Final Project WangZZangG

Project Description

The Dental Clinic Management System is a full-stack application designed to streamline operations for dental clinics. It includes:
Backend: Built with Spring Boot (Java) for REST API and business logic.
Frontend: Developed using React and TypeScript for a dynamic user interface.
Database: MySQL for persistent data storage.

Key features include patient/dentist management, appointment scheduling, treatment tracking, payment processing, and insurance management.

Frontend	React v18, TypeScript v4.x, Node.js v16+

Backend	Java JDK 17, Spring Boot v3.x, Maven

Database	MySQL v8.0

Key Libraries	Spring Data JPA, Axios, React Router





Installation & Setup Instructions

Prerequisites

Node.js and npm installed.
MySQL Server installed and running.
Java JDK 17 or 11.
Maven (or use the Maven wrapper in the backend).

Database Setup

1.Create a MySQL database named dental_clinic.

2.Run the provided SQL scripts (schema.sql and procedures.sql).

Backend Configuration

1.Ensure Java JDK and Maven is correctly installed.

2.Open src/main/resources/application.properties.

3.Update database credentials:
spring.datasource.url=jdbc:mysql://localhost:3306/dental_clinic  
spring.datasource.username=root  
spring.datasource.password=yourpassword  

4a.Run the backend by running the DentalClinicApplication class,

OR

4b.Enter the backend directory

cd backend

mvn spring-boot:run

The backend will run at http://localhost:8080.


Run the Frontend

1.Enter the frontend directory

cd frontend


2.Run the following to start the frontend

npm install

npm run dev

The front end will run at http://localhost:5173/
