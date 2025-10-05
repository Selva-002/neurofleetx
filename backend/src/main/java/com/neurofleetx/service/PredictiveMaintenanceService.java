package com.neurofleetx.service;

import com.neurofleetx.dto.MaintenanceAlert;
import com.neurofleetx.dto.VehicleHealthReport;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PredictiveMaintenanceService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public VehicleHealthReport generateHealthReport(Long vehicleId) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);
        if (vehicleOpt.isEmpty()) {
            throw new RuntimeException("Vehicle not found");
        }

        Vehicle vehicle = vehicleOpt.get();
        VehicleHealthReport report = new VehicleHealthReport(vehicleId, vehicle.getLicensePlate());
        
        // Mock health analysis
        analyzeVehicleHealth(vehicle, report);
        
        return report;
    }

    public List<MaintenanceAlert> getActiveAlerts() {
        List<MaintenanceAlert> alerts = new ArrayList<>();
        
        // Get all vehicles and generate mock alerts
        List<Vehicle> vehicles = vehicleRepository.findAll();
        for (Vehicle vehicle : vehicles) {
            List<MaintenanceAlert> vehicleAlerts = generateMockAlerts(vehicle);
            alerts.addAll(vehicleAlerts);
        }
        
        return alerts;
    }

    public List<MaintenanceAlert> getAlertsByVehicle(Long vehicleId) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);
        if (vehicleOpt.isEmpty()) {
            return new ArrayList<>();
        }
        
        return generateMockAlerts(vehicleOpt.get());
    }

    public List<MaintenanceAlert> getCriticalAlerts() {
        return getActiveAlerts().stream()
                .filter(alert -> "CRITICAL".equals(alert.getSeverity()))
                .toList();
    }

    private void analyzeVehicleHealth(Vehicle vehicle, VehicleHealthReport report) {
        // Mock health analysis based on vehicle data
        double healthScore = 100.0;
        List<MaintenanceAlert> alerts = new ArrayList<>();
        
        // Analyze mileage
        if (vehicle.getMileage() != null) {
            if (vehicle.getMileage() > 200000) {
                healthScore -= 20;
                alerts.add(createAlert(vehicle, "HIGH_MILEAGE", "HIGH", 
                    "Vehicle has high mileage (" + vehicle.getMileage() + " miles)"));
            } else if (vehicle.getMileage() > 150000) {
                healthScore -= 10;
                alerts.add(createAlert(vehicle, "HIGH_MILEAGE", "MEDIUM", 
                    "Vehicle approaching high mileage (" + vehicle.getMileage() + " miles)"));
            }
        }
        
        // Analyze engine hours
        if (vehicle.getEngineHours() != null) {
            if (vehicle.getEngineHours() > 10000) {
                healthScore -= 15;
                alerts.add(createAlert(vehicle, "ENGINE_HOURS", "HIGH", 
                    "High engine hours (" + vehicle.getEngineHours() + " hours)"));
            }
        }
        
        // Analyze fuel level
        if (vehicle.getFuelLevel() != null) {
            if (vehicle.getFuelLevel() < 10) {
                healthScore -= 5;
                alerts.add(createAlert(vehicle, "LOW_FUEL", "LOW", 
                    "Low fuel level (" + vehicle.getFuelLevel() + "%)"));
            }
        }
        
        // Analyze health status
        if (vehicle.getHealthStatus() != null) {
            switch (vehicle.getHealthStatus().toUpperCase()) {
                case "POOR":
                    healthScore -= 30;
                    alerts.add(createAlert(vehicle, "POOR_HEALTH", "CRITICAL", 
                        "Vehicle health status is poor"));
                    break;
                case "FAIR":
                    healthScore -= 15;
                    alerts.add(createAlert(vehicle, "FAIR_HEALTH", "MEDIUM", 
                        "Vehicle health status is fair"));
                    break;
                case "GOOD":
                    healthScore -= 5;
                    break;
            }
        }
        
        // Set overall health status
        if (healthScore >= 90) {
            report.setOverallHealthStatus("EXCELLENT");
        } else if (healthScore >= 75) {
            report.setOverallHealthStatus("GOOD");
        } else if (healthScore >= 60) {
            report.setOverallHealthStatus("FAIR");
        } else if (healthScore >= 40) {
            report.setOverallHealthStatus("POOR");
        } else {
            report.setOverallHealthStatus("CRITICAL");
        }
        
        report.setHealthScore(Math.max(0, healthScore));
        report.setActiveAlerts(alerts);
        report.setFuelEfficiency(calculateFuelEfficiency(vehicle));
        report.setTotalMileage(vehicle.getMileage());
        report.setEngineHours(vehicle.getEngineHours());
        report.setLastServiceDate("2024-01-15"); // Mock data
        report.setNextServiceDue("2024-04-15"); // Mock data
    }

    private List<MaintenanceAlert> generateMockAlerts(Vehicle vehicle) {
        List<MaintenanceAlert> alerts = new ArrayList<>();
        
        // Generate mock alerts based on vehicle condition
        if (vehicle.getMileage() != null && vehicle.getMileage() > 100000) {
            alerts.add(createAlert(vehicle, "MAINTENANCE_DUE", "MEDIUM", 
                "Regular maintenance due based on mileage"));
        }
        
        if (vehicle.getEngineHours() != null && vehicle.getEngineHours() > 5000) {
            alerts.add(createAlert(vehicle, "ENGINE_SERVICE", "HIGH", 
                "Engine service recommended after " + vehicle.getEngineHours() + " hours"));
        }
        
        if (vehicle.getHealthStatus() != null && "POOR".equals(vehicle.getHealthStatus())) {
            alerts.add(createAlert(vehicle, "CRITICAL_HEALTH", "CRITICAL", 
                "Vehicle requires immediate attention"));
        }
        
        return alerts;
    }

    private MaintenanceAlert createAlert(Vehicle vehicle, String alertType, String severity, String description) {
        MaintenanceAlert alert = new MaintenanceAlert(
            vehicle.getId(), 
            vehicle.getLicensePlate(), 
            alertType, 
            severity, 
            description
        );
        
        alert.setId(System.currentTimeMillis() % 10000); // Mock ID
        alert.setConfidenceScore(0.85 + Math.random() * 0.15); // Mock confidence
        alert.setRecommendedAction(getRecommendedAction(alertType));
        alert.setEstimatedMaintenanceDate(LocalDateTime.now().plusDays(7 + (int)(Math.random() * 14)));
        
        return alert;
    }

    private String getRecommendedAction(String alertType) {
        switch (alertType) {
            case "HIGH_MILEAGE":
                return "Schedule comprehensive inspection and replace wear parts";
            case "ENGINE_HOURS":
                return "Perform engine service and oil change";
            case "LOW_FUEL":
                return "Refuel vehicle immediately";
            case "POOR_HEALTH":
                return "Schedule immediate diagnostic inspection";
            case "MAINTENANCE_DUE":
                return "Schedule regular maintenance service";
            case "ENGINE_SERVICE":
                return "Schedule engine service and inspection";
            case "CRITICAL_HEALTH":
                return "Remove vehicle from service and schedule immediate repair";
            default:
                return "Schedule inspection and maintenance";
        }
    }

    private Double calculateFuelEfficiency(Vehicle vehicle) {
        // Mock fuel efficiency calculation
        if (vehicle.getMileage() != null && vehicle.getEngineHours() != null) {
            return 25.0 + Math.random() * 10.0; // Mock: 25-35 MPG
        }
        return 30.0; // Default mock efficiency
    }
}









