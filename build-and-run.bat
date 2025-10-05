@echo off
echo ========================================
echo    NeuroFleetX - Build and Run
echo ========================================

echo.
echo Step 1: Building Backend Locally...
cd backend

echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found. Please install Java 17 or higher.
    echo Download from: https://adoptium.net/
    pause
    exit /b 1
)

echo Building with Maven...
mvnw.cmd clean package -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Backend build failed
    pause
    exit /b 1
)

echo Backend built successfully!
cd ..

echo.
echo Step 2: Starting with Docker...
echo Using local build approach...

REM Create a temporary docker-compose for local build
echo services: > docker-compose.local.yml
echo   mysql: >> docker-compose.local.yml
echo     image: mysql:8.0 >> docker-compose.local.yml
echo     container_name: neurofleetx-mysql >> docker-compose.local.yml
echo     environment: >> docker-compose.local.yml
echo       MYSQL_ROOT_PASSWORD: rootpassword >> docker-compose.local.yml
echo       MYSQL_DATABASE: neurofleetx >> docker-compose.local.yml
echo       MYSQL_USER: neurofleetx >> docker-compose.local.yml
echo       MYSQL_PASSWORD: neurofleetx123 >> docker-compose.local.yml
echo     ports: >> docker-compose.local.yml
echo       - "3306:3306" >> docker-compose.local.yml
echo     volumes: >> docker-compose.local.yml
echo       - mysql_data:/var/lib/mysql >> docker-compose.local.yml
echo     networks: >> docker-compose.local.yml
echo       - neurofleetx-network >> docker-compose.local.yml
echo. >> docker-compose.local.yml
echo   backend: >> docker-compose.local.yml
echo     build: >> docker-compose.local.yml
echo       context: ./backend >> docker-compose.local.yml
echo       dockerfile: Dockerfile.local >> docker-compose.local.yml
echo     container_name: neurofleetx-backend >> docker-compose.local.yml
echo     environment: >> docker-compose.local.yml
echo       SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/neurofleetx?useSSL=false^&serverTimezone=UTC^&createDatabaseIfNotExist=true >> docker-compose.local.yml
echo       SPRING_DATASOURCE_USERNAME: neurofleetx >> docker-compose.local.yml
echo       SPRING_DATASOURCE_PASSWORD: neurofleetx123 >> docker-compose.local.yml
echo       JWT_SECRET: neurofleetx-secret-key-2024 >> docker-compose.local.yml
echo     ports: >> docker-compose.local.yml
echo       - "8080:8080" >> docker-compose.local.yml
echo     depends_on: >> docker-compose.local.yml
echo       - mysql >> docker-compose.local.yml
echo     networks: >> docker-compose.local.yml
echo       - neurofleetx-network >> docker-compose.local.yml
echo. >> docker-compose.local.yml
echo   frontend: >> docker-compose.local.yml
echo     build: >> docker-compose.local.yml
echo       context: ./frontend >> docker-compose.local.yml
echo       dockerfile: Dockerfile >> docker-compose.local.yml
echo     container_name: neurofleetx-frontend >> docker-compose.local.yml
echo     ports: >> docker-compose.local.yml
echo       - "3000:3000" >> docker-compose.local.yml
echo     depends_on: >> docker-compose.local.yml
echo       - backend >> docker-compose.local.yml
echo     networks: >> docker-compose.local.yml
echo       - neurofleetx-network >> docker-compose.local.yml
echo. >> docker-compose.local.yml
echo volumes: >> docker-compose.local.yml
echo   mysql_data: >> docker-compose.local.yml
echo. >> docker-compose.local.yml
echo networks: >> docker-compose.local.yml
echo   neurofleetx-network: >> docker-compose.local.yml
echo     driver: bridge >> docker-compose.local.yml

echo Starting services with local build...
docker-compose -f docker-compose.local.yml up --build

pause








