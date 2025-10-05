@echo off
echo ========================================
echo    Starting NeuroFleetX Frontend
echo ========================================

cd frontend

echo Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js 18 or higher.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
if not exist "node_modules" (
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting React development server...
echo Frontend will be available at: http://localhost:3000
echo.

npm run dev

pause








