@echo off
echo Starting NeuroFleetX Frontend...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed or not in PATH
    echo Please install Node.js 18 or higher from: https://nodejs.org/
    pause
    exit /b 1
)

REM Navigate to frontend directory
cd frontend

REM Check if package.json exists
if not exist "package.json" (
    echo package.json not found. Please ensure you're in the correct directory.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the development server
echo Starting React development server...
npm run dev

pause









