package com.neurofleetx.service;

import com.neurofleetx.dto.DashboardMetrics;
import com.neurofleetx.dto.MaintenanceAlert;
import com.neurofleetx.dto.VehicleHealthReport;
import com.neurofleetx.entity.BookingStatus;
import com.neurofleetx.entity.VehicleStatus;
import com.neurofleetx.repository.BookingRepository;
import com.neurofleetx.repository.UserRepository;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PredictiveMaintenanceService maintenanceService;

    public DashboardMetrics getDashboardMetrics() {
        DashboardMetrics metrics = new DashboardMetrics();

        // Vehicle metrics
        metrics.setTotalVehicles(vehicleRepository.count());
        metrics.setAvailableVehicles(vehicleRepository.countByStatus(VehicleStatus.AVAILABLE));
        metrics.setVehiclesInUse(vehicleRepository.countByStatus(VehicleStatus.IN_USE));
        metrics.setVehiclesInMaintenance(vehicleRepository.countByStatus(VehicleStatus.MAINTENANCE));

        // Booking metrics
        metrics.setTotalBookings(bookingRepository.count());
        metrics.setPendingBookings(bookingRepository.countByStatus(BookingStatus.PENDING));
        metrics.setCompletedBookings(bookingRepository.countByStatus(BookingStatus.COMPLETED));

        // Customer metrics
        metrics.setTotalCustomers(userRepository.count());

        // Calculate fleet utilization rate
        long totalVehicles = metrics.getTotalVehicles();
        long vehiclesInUse = metrics.getVehiclesInUse();
        if (totalVehicles > 0) {
            metrics.setFleetUtilizationRate((double) vehiclesInUse / totalVehicles * 100);
        } else {
            metrics.setFleetUtilizationRate(0.0);
        }

        // Mock average booking value
        metrics.setAverageBookingValue(45.50);

        // Get critical alerts
        metrics.setCriticalAlerts(maintenanceService.getCriticalAlerts());

        // Generate breakdowns
        metrics.setBookingsByType(generateBookingsByType());
        metrics.setVehiclesByType(generateVehiclesByType());
        metrics.setBookingsByStatus(generateBookingsByStatus());
        metrics.setVehiclesByStatus(generateVehiclesByStatus());

        // Generate fleet health summary (mock data for now)
        metrics.setFleetHealthSummary(generateFleetHealthSummary());

        return metrics;
    }

    public DashboardMetrics getAdminDashboardMetrics() {
        DashboardMetrics metrics = getDashboardMetrics();
        
        // Add admin-specific metrics
        metrics.setSystemUptime(99.9); // Mock system uptime
        metrics.setActiveUsers(userRepository.count());
        metrics.setSystemAlerts(5); // Mock system alerts
        metrics.setDatabaseSize("2.5 GB"); // Mock database size
        metrics.setApiCallsToday(15420L); // Mock API calls
        metrics.setErrorRate(0.02); // Mock error rate
        
        return metrics;
    }

    public DashboardMetrics getDispatcherDashboardMetrics() {
        DashboardMetrics metrics = getDashboardMetrics();
        
        // Add dispatcher-specific metrics
        metrics.setUrgentTasks(8); // Mock urgent tasks
        metrics.setPendingAssignments(12); // Mock pending assignments
        metrics.setRouteOptimizations(5); // Mock route optimizations
        metrics.setDriverResponseTime(4.2); // Mock average response time
        metrics.setFleetEfficiency(87.5); // Mock fleet efficiency
        
        return metrics;
    }

    private Map<String, Long> generateBookingsByType() {
        Map<String, Long> bookingsByType = new HashMap<>();
        bookingsByType.put("RIDE_SHARE", 45L);
        bookingsByType.put("DELIVERY", 32L);
        bookingsByType.put("FREIGHT", 18L);
        bookingsByType.put("EMERGENCY", 5L);
        bookingsByType.put("SCHEDULED", 28L);
        return bookingsByType;
    }

    private Map<String, Long> generateVehiclesByType() {
        Map<String, Long> vehiclesByType = new HashMap<>();
        vehiclesByType.put("SEDAN", 25L);
        vehiclesByType.put("SUV", 18L);
        vehiclesByType.put("TRUCK", 12L);
        vehiclesByType.put("VAN", 15L);
        vehiclesByType.put("MOTORCYCLE", 8L);
        vehiclesByType.put("BUS", 5L);
        return vehiclesByType;
    }

    private Map<String, Long> generateBookingsByStatus() {
        Map<String, Long> bookingsByStatus = new HashMap<>();
        bookingsByStatus.put("PENDING", 15L);
        bookingsByStatus.put("CONFIRMED", 25L);
        bookingsByStatus.put("IN_PROGRESS", 8L);
        bookingsByStatus.put("COMPLETED", 95L);
        bookingsByStatus.put("CANCELLED", 5L);
        return bookingsByStatus;
    }

    private Map<String, Long> generateVehiclesByStatus() {
        Map<String, Long> vehiclesByStatus = new HashMap<>();
        vehiclesByStatus.put("AVAILABLE", 45L);
        vehiclesByStatus.put("IN_USE", 28L);
        vehiclesByStatus.put("MAINTENANCE", 5L);
        vehiclesByStatus.put("OUT_OF_SERVICE", 2L);
        return vehiclesByStatus;
    }

    private List<VehicleHealthReport> generateFleetHealthSummary() {
        // Mock fleet health summary
        return vehicleRepository.findAll().stream()
                .limit(10) // Limit to first 10 vehicles for summary
                .map(vehicle -> {
                    try {
                        return maintenanceService.generateHealthReport(vehicle.getId());
                    } catch (Exception e) {
                        // Return mock health report if generation fails
                        VehicleHealthReport mockReport = new VehicleHealthReport(vehicle.getId(), vehicle.getLicensePlate());
                        mockReport.setOverallHealthStatus("GOOD");
                        mockReport.setHealthScore(85.0);
                        return mockReport;
                    }
                })
                .collect(Collectors.toList());
    }
}








