@echo off
echo ========================================
echo    NeuroFleetX - Starting Application
echo ========================================

echo.
echo Checking Docker status...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running
    echo Please install Docker Desktop and start it
    echo Download from: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo Docker is available. Starting services...
echo.

REM Clean up any existing containers
echo Cleaning up existing containers...
docker-compose down 2>nul

REM Build and start services
echo Building and starting services...
docker-compose up --build

pause









