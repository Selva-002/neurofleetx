@echo off
echo Starting NeuroFleetX Backend...

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Check if Maven wrapper exists
if not exist "mvnw.cmd" (
    echo Maven wrapper not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

REM Start MySQL (if you have it installed locally)
echo Starting MySQL...
net start mysql80 2>nul
if %errorlevel% neq 0 (
    echo MySQL service not found. Please install MySQL or start it manually.
    echo You can download MySQL from: https://dev.mysql.com/downloads/mysql/
    pause
)

REM Wait a moment for MySQL to start
timeout /t 5 /nobreak >nul

REM Run the Spring Boot application
echo Starting Spring Boot application...
mvnw.cmd spring-boot:run

pause









