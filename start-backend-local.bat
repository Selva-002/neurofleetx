@echo off
echo ========================================
echo    Starting NeuroFleetX Backend
echo ========================================

cd backend

echo Checking Java installation...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java not found. Please install Java 17 or higher.
    echo Download from: https://adoptium.net/
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo.

mvnw.cmd spring-boot:run

pause








