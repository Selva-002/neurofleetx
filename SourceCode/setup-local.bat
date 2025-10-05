@echo off
echo ========================================
echo    NeuroFleetX - Local Setup Guide
echo ========================================

echo.
echo This will help you run NeuroFleetX without Docker
echo.

echo Step 1: Install Prerequisites
echo.
echo 1. Java 17 or higher
echo    Download from: https://adoptium.net/
echo.
echo 2. Node.js 18 or higher  
echo    Download from: https://nodejs.org/
echo.
echo 3. MySQL 8.0
echo    Download from: https://dev.mysql.com/downloads/mysql/
echo.

echo Step 2: Setup Database
echo.
echo After installing MySQL, run these commands in MySQL Workbench or command line:
echo.
echo CREATE DATABASE neurofleetx;
echo CREATE USER 'neurofleetx'@'localhost' IDENTIFIED BY 'neurofleetx123';
echo GRANT ALL PRIVILEGES ON neurofleetx.* TO 'neurofleetx'@'localhost';
echo FLUSH PRIVILEGES;
echo.

echo Step 3: Run the Application
echo.
echo Open two separate terminals:
echo.
echo Terminal 1 - Backend:
echo cd backend
echo mvnw.cmd spring-boot:run
echo.
echo Terminal 2 - Frontend:
echo cd frontend
echo npm install
echo npm run dev
echo.

echo Step 4: Access the Application
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo.

echo Default Login Credentials:
echo Admin:      admin / admin123
echo Dispatcher: dispatcher / dispatcher123
echo Customer:   customer / customer123
echo.

pause








