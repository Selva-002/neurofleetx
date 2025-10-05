# NeuroFleetX - Troubleshooting Guide

## Common Issues and Solutions

### 1. Docker Issues

#### Problem: "unable to get image 'mysql:8.0'"
**Solution:**
- Ensure Docker Desktop is running
- Restart Docker Desktop as Administrator
- Check if WSL2 is enabled (Windows 10/11)

#### Problem: "failed to solve: lstat /target: no such file or directory"
**Solution:**
- This is fixed in the updated Dockerfile
- The new Dockerfile builds the application inside the container

#### Problem: Docker Desktop not starting
**Solutions:**
1. **Enable Windows Features:**
   - Windows Subsystem for Linux (WSL)
   - Virtual Machine Platform
   - Hyper-V (Windows 10 Pro/Enterprise)

2. **Update WSL:**
   ```bash
   wsl --update
   wsl --set-default-version 2
   ```

3. **Reset Docker Desktop:**
   - Settings → Reset to factory defaults
   - Restart computer

### 2. Build Issues

#### Problem: Maven build fails
**Solution:**
```bash
cd backend
./mvnw clean install
```

#### Problem: Node.js/npm issues
**Solution:**
```bash
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 3. Database Issues

#### Problem: Database connection failed
**Solutions:**
1. **Check MySQL is running:**
   ```bash
   docker ps | grep mysql
   ```

2. **Check database credentials:**
   - Username: neurofleetx
   - Password: neurofleetx123
   - Database: neurofleetx

3. **Reset database:**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

### 4. Port Conflicts

#### Problem: Port already in use
**Solutions:**
1. **Check what's using the port:**
   ```bash
   netstat -ano | findstr :8080
   netstat -ano | findstr :3000
   netstat -ano | findstr :3306
   ```

2. **Kill the process:**
   ```bash
   taskkill /PID <PID_NUMBER> /F
   ```

3. **Change ports in docker-compose.yml**

### 5. Application Issues

#### Problem: Frontend can't connect to backend
**Solutions:**
1. **Check backend is running:**
   - Visit: http://localhost:8080/actuator/health

2. **Check CORS configuration:**
   - Backend should allow localhost:3000

3. **Check network connectivity:**
   ```bash
   curl http://localhost:8080/api/auth/signin
   ```

#### Problem: Authentication not working
**Solutions:**
1. **Clear browser storage:**
   - Open DevTools → Application → Storage → Clear All

2. **Check JWT configuration:**
   - Verify JWT_SECRET in docker-compose.yml

3. **Test with default credentials:**
   - Admin: admin / admin123
   - Dispatcher: dispatcher / dispatcher123
   - Customer: customer / customer123

### 6. Performance Issues

#### Problem: Slow startup
**Solutions:**
1. **Increase Docker resources:**
   - Docker Desktop → Settings → Resources
   - Increase Memory to 4GB+
   - Increase CPU to 2+

2. **Use SSD storage:**
   - Move project to SSD if possible

3. **Clean Docker cache:**
   ```bash
   docker system prune -a
   ```

### 7. Development Mode

#### Running without Docker:
1. **Start MySQL locally:**
   ```bash
   # Install MySQL 8.0
   # Create database: neurofleetx
   # Create user: neurofleetx / neurofleetx123
   ```

2. **Start Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 8. Logs and Debugging

#### View logs:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql

# Follow logs
docker-compose logs -f backend
```

#### Debug backend:
```bash
# Check if backend is healthy
curl http://localhost:8080/actuator/health

# Check API endpoints
curl http://localhost:8080/api/auth/signin
```

#### Debug frontend:
```bash
# Check if frontend is running
curl http://localhost:3000

# Check browser console for errors
# Open DevTools → Console
```

### 9. Reset Everything

#### Complete reset:
```bash
# Stop all services
docker-compose down -v

# Remove all containers and images
docker system prune -a

# Remove volumes
docker volume prune

# Rebuild everything
docker-compose up --build
```

### 10. System Requirements

#### Minimum Requirements:
- **OS:** Windows 10 Pro/Enterprise or Windows 11
- **RAM:** 8GB (4GB for Docker)
- **Storage:** 10GB free space
- **CPU:** 2 cores

#### Recommended:
- **OS:** Windows 11
- **RAM:** 16GB (8GB for Docker)
- **Storage:** 20GB free space (SSD)
- **CPU:** 4+ cores

### 11. Getting Help

If you're still having issues:

1. **Check the logs:**
   ```bash
   docker-compose logs > logs.txt
   ```

2. **Check system resources:**
   - Task Manager → Performance
   - Docker Desktop → Resources

3. **Try the manual setup:**
   - Use the batch files: `run-backend.bat` and `run-frontend.bat`

4. **Contact support:**
   - Create an issue with logs and system details









