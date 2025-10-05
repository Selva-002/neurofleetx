@echo off
echo ========================================
echo    NeuroFleetX - Complete Local Setup
echo ========================================

echo.
echo This will run NeuroFleetX completely locally (no Docker needed)
echo.

REM Check prerequisites
echo Checking prerequisites...

java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found
    echo Please install Java 17+ from: https://adoptium.net/
    pause
    exit /b 1
)

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found
    echo Please install Node.js 18+ from: https://nodejs.org/
    pause
    exit /b 1
)

mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MySQL command not found
    echo Please ensure MySQL 8.0 is installed and running
    echo Download from: https://dev.mysql.com/downloads/mysql/
    echo.
    echo Make sure to create the database:
    echo   CREATE DATABASE neurofleetx;
    echo   CREATE USER 'neurofleetx'@'localhost' IDENTIFIED BY 'neurofleetx123';
    echo   GRANT ALL PRIVILEGES ON neurofleetx.* TO 'neurofleetx'@'localhost';
    echo   FLUSH PRIVILEGES;
    echo.
    pause
)

echo All prerequisites found!
echo.

REM Update application.properties for local MySQL
echo Updating backend configuration for local MySQL...
cd backend\src\main\resources
copy application.properties application.properties.backup >nul 2>&1

echo # Database Configuration > application.properties.local
echo spring.datasource.url=jdbc:mysql://localhost:3306/neurofleetx?useSSL=false^&serverTimezone=UTC^&createDatabaseIfNotExist=true >> application.properties.local
echo spring.datasource.username=neurofleetx >> application.properties.local
echo spring.datasource.password=neurofleetx123 >> application.properties.local
echo spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver >> application.properties.local
echo. >> application.properties.local
echo # JPA Configuration >> application.properties.local
echo spring.jpa.hibernate.ddl-auto=update >> application.properties.local
echo spring.jpa.show-sql=true >> application.properties.local
echo spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect >> application.properties.local
echo spring.jpa.properties.hibernate.format_sql=true >> application.properties.local
echo. >> application.properties.local
echo # JWT Configuration >> application.properties.local
echo jwt.secret=neurofleetx-secret-key-2024 >> application.properties.local
echo jwt.expiration=86400000 >> application.properties.local
echo. >> application.properties.local
echo # Server Configuration >> application.properties.local
echo server.port=8080 >> application.properties.local
echo. >> application.properties.local
echo # CORS Configuration >> application.properties.local
echo cors.allowed-origins=http://localhost:3000 >> application.properties.local
echo cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS >> application.properties.local
echo cors.allowed-headers=* >> application.properties.local
echo. >> application.properties.local
echo # Logging >> application.properties.local
echo logging.level.com.neurofleetx=DEBUG >> application.properties.local
echo logging.level.org.springframework.security=DEBUG >> application.properties.local
echo. >> application.properties.local
echo # Actuator Configuration >> application.properties.local
echo management.endpoints.web.exposure.include=health,info,metrics >> application.properties.local
echo management.endpoint.health.show-details=when-authorized >> application.properties.local

copy application.properties.local application.properties >nul

cd ..\..\..\..

echo.
echo Starting Backend...
echo Backend will be available at: http://localhost:8080
echo.

start "NeuroFleetX Backend" cmd /k "cd backend && mvnw.cmd spring-boot:run --spring.config.location=classpath:application.properties"

echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend...
echo Frontend will be available at: http://localhost:3000
echo.

cd frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)

start "NeuroFleetX Frontend" cmd /k "npm run dev"

cd ..

echo.
echo ========================================
echo    NeuroFleetX is starting up!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo.
echo Default Login Credentials:
echo Admin:      admin / admin123
echo Dispatcher: dispatcher / dispatcher123  
echo Customer:   customer / customer123
echo.
echo Both services are running in separate windows.
echo Close those windows to stop the services.
echo.

pause








