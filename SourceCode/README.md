# NeuroFleetX - AI-Driven Urban Mobility Optimization

A comprehensive full-stack web application that revolutionizes urban transportation with artificial intelligence, predictive analytics, and real-time optimization.

## 🚀 Features

### Core Modules

1. **Authentication & Role Management**
   - JWT-based authentication
   - Role-based access control (Admin, Dispatcher, Customer)
   - Secure user registration and login

2. **Fleet Inventory & Vehicle Telemetry**
   - Real-time vehicle tracking and management
   - Vehicle telemetry data collection (location, fuel, health metrics)
   - CRUD operations for fleet management

3. **AI Route & Load Optimization Engine**
   - Mock AI-powered route optimization
   - Smart vehicle assignment algorithms
   - Multiple optimization strategies (distance, time, cost, efficiency)

4. **Predictive Maintenance & Health Analytics**
   - AI-driven maintenance predictions
   - Vehicle health monitoring and alerts
   - Risk assessment and maintenance scheduling

5. **Customer Booking & Smart Recommendations**
   - Intelligent booking system
   - Vehicle recommendation engine
   - Real-time booking management

6. **Admin Dashboard & Urban Mobility Insights**
   - Comprehensive analytics dashboard
   - Fleet utilization metrics
   - Performance charts and insights

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven** for dependency management

### Frontend
- **React 18**
- **Vite** for build tooling
- **Material-UI (MUI)** for components
- **React Router** for navigation
- **Recharts** for data visualization
- **Axios** for API communication

### Infrastructure
- **Docker** & **Docker Compose**
- **MySQL** database
- **Multi-service architecture**

## 📁 Project Structure

```
NeuroFleetX/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/neurofleetx/
│   │   ├── entity/            # JPA Entities
│   │   ├── repository/        # Data Repositories
│   │   ├── service/           # Business Logic
│   │   ├── controller/        # REST Controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── security/         # Security Configuration
│   │   └── config/           # Configuration Classes
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── pages/            # Page Components
│   │   ├── contexts/         # React Contexts
│   │   ├── api/              # API Configuration
│   │   └── main.jsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml         # Docker Compose Configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Java 17+ (for local development)
- Node.js 18+ (for local development)

### Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NeuroFleetX
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Start MySQL database**
   ```bash
   docker run --name neurofleetx-mysql -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=neurofleetx -e MYSQL_USER=neurofleetx -e MYSQL_PASSWORD=neurofleetx123 -p 3306:3306 -d mysql:8.0
   ```

3. **Run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Default Credentials

The application comes with pre-seeded users:

| Role | Username | Password | Access Level |
|------|----------|----------|--------------|
| Admin | admin | admin123 | Full access to all features |
| Dispatcher | dispatcher | dispatcher123 | Fleet and booking management |
| Customer | customer | customer123 | Basic booking and dashboard access |

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Fleet Management
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle
- `PUT /api/vehicles/{id}` - Update vehicle
- `DELETE /api/vehicles/{id}` - Delete vehicle
- `GET /api/vehicles/available` - Get available vehicles

### Telemetry
- `POST /api/telemetry` - Submit telemetry data
- `GET /api/telemetry/vehicle/{id}` - Get vehicle telemetry
- `GET /api/telemetry/vehicle/{id}/latest` - Get latest telemetry

### Route Optimization
- `POST /api/optimize/routes` - Optimize routes
- `POST /api/optimize/recommend-vehicles` - Get vehicle recommendations

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/{id}` - Update booking
- `DELETE /api/bookings/{id}` - Delete booking

### Maintenance
- `GET /api/maintenance/alerts` - Get maintenance alerts
- `GET /api/maintenance/health-report/{vehicleId}` - Get vehicle health report

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics

## 🎨 Frontend Pages

### Public Pages
- **Home** (`/`) - Landing page with feature overview
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

### Protected Pages
- **Dashboard** (`/dashboard`) - Main dashboard with key metrics
- **Fleet** (`/fleet`) - Fleet management interface
- **Bookings** (`/bookings`) - Booking management
- **Admin** (`/admin`) - Admin analytics dashboard (Admin/Dispatcher only)
- **Maintenance** (`/maintenance`) - Predictive maintenance alerts (Admin/Dispatcher only)

## 🔧 Configuration

### Backend Configuration

The backend configuration is in `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/neurofleetx
spring.datasource.username=neurofleetx
spring.datasource.password=neurofleetx123

# JWT Configuration
jwt.secret=neurofleetx-secret-key-2024
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

### Frontend Configuration

The frontend uses environment variables for API configuration. Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

## 🐳 Docker Services

### MySQL Service
- **Image**: mysql:8.0
- **Port**: 3306
- **Database**: neurofleetx
- **Username**: neurofleetx
- **Password**: neurofleetx123

### Backend Service
- **Port**: 8080
- **Dependencies**: MySQL
- **Health Check**: Available at `/actuator/health`

### Frontend Service
- **Port**: 3000
- **Dependencies**: Backend
- **Hot Reload**: Enabled in development

## 📈 Key Features in Detail

### AI Route Optimization
- Mock implementation of route optimization algorithms
- Multiple optimization strategies (distance, time, cost, efficiency)
- Vehicle assignment based on booking requirements
- Real-time route calculation and recommendations

### Predictive Maintenance
- Rule-based maintenance alert system
- Vehicle health scoring and monitoring
- Maintenance scheduling and recommendations
- Critical alert prioritization

### Real-time Fleet Management
- Live vehicle tracking and status updates
- Telemetry data collection and analysis
- Fleet utilization monitoring
- Performance metrics and reporting

### Role-based Access Control
- Three user roles with different access levels
- JWT-based authentication and authorization
- Secure API endpoints with role validation
- Protected routes in the frontend

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure MySQL container is running
   - Check database credentials in application.properties
   - Verify network connectivity between services

2. **Frontend API Connection Issues**
   - Check if backend is running on port 8080
   - Verify CORS configuration
   - Check browser console for errors

3. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify user credentials

4. **Docker Issues**
   - Ensure Docker and Docker Compose are installed
   - Check if ports 3000, 8080, and 3306 are available
   - Run `docker-compose down` and `docker-compose up --build` to restart

### Logs

View logs for each service:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

## 🔮 Future Enhancements

- Real AI/ML integration for route optimization
- Real-time WebSocket communication
- Mobile application (React Native)
- Advanced analytics and reporting
- Integration with external mapping services
- IoT device integration for real telemetry data
- Machine learning models for predictive maintenance

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**NeuroFleetX** - Revolutionizing urban mobility with AI-powered optimization! 🚗💨









