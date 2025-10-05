package com.neurofleetx.service;

import com.neurofleetx.dto.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RouteOptimizationService {

    public RouteOptimizationResponse optimizeRoutes(RouteOptimizationRequest request) {
        // Mock AI optimization algorithm
        // In a real implementation, this would use machine learning or optimization algorithms
        
        List<RouteAssignment> assignments = new ArrayList<>();
        List<BookingDto> pendingBookings = request.getBookings().stream()
                .filter(booking -> booking.getStatus().toString().equals("PENDING"))
                .collect(Collectors.toList());
        
        List<VehicleDto> availableVehicles = request.getAvailableVehicles().stream()
                .filter(vehicle -> vehicle.getStatus().toString().equals("AVAILABLE"))
                .collect(Collectors.toList());

        if (availableVehicles.isEmpty()) {
            return new RouteOptimizationResponse(
                Collections.emptyList(),
                request.getOptimizationType(),
                "FAILED"
            );
        }

        // Simple assignment algorithm (mock)
        int vehicleIndex = 0;
        for (BookingDto booking : pendingBookings) {
            if (vehicleIndex >= availableVehicles.size()) {
                vehicleIndex = 0; // Round-robin assignment
            }
            
            VehicleDto vehicle = availableVehicles.get(vehicleIndex);
            
            // Find existing assignment for this vehicle or create new one
            RouteAssignment assignment = assignments.stream()
                    .filter(a -> a.getVehicleId().equals(vehicle.getId()))
                    .findFirst()
                    .orElse(null);
            
            if (assignment == null) {
                assignment = new RouteAssignment(vehicle.getId(), vehicle.getLicensePlate(), new ArrayList<>());
                assignments.add(assignment);
            }
            
            assignment.getAssignedBookings().add(booking);
            vehicleIndex++;
        }

        // Calculate optimization metrics (mock calculations)
        for (RouteAssignment assignment : assignments) {
            calculateAssignmentMetrics(assignment);
        }

        double totalScore = calculateTotalOptimizationScore(assignments, request.getOptimizationType());
        
        RouteOptimizationResponse response = new RouteOptimizationResponse(
            assignments,
            request.getOptimizationType(),
            "SUCCESS"
        );
        response.setTotalOptimizationScore(totalScore);
        response.setMessage("Routes optimized successfully using " + request.getOptimizationType() + " optimization");

        return response;
    }

    private void calculateAssignmentMetrics(RouteAssignment assignment) {
        List<BookingDto> bookings = assignment.getAssignedBookings();
        
        if (bookings.isEmpty()) {
            assignment.setTotalDistance(0.0);
            assignment.setEstimatedTime(0.0);
            assignment.setEstimatedCost(0.0);
            assignment.setRouteDescription("No bookings assigned");
            return;
        }

        // Mock calculations - in reality, these would use real routing algorithms
        double totalDistance = bookings.size() * 15.5; // Mock: 15.5 km per booking
        double estimatedTime = totalDistance * 2.5; // Mock: 2.5 minutes per km
        double estimatedCost = totalDistance * 1.2; // Mock: $1.2 per km

        assignment.setTotalDistance(totalDistance);
        assignment.setEstimatedTime(estimatedTime);
        assignment.setEstimatedCost(estimatedCost);
        assignment.setRouteDescription(String.format("Route with %d stops, %.1f km total", 
            bookings.size(), totalDistance));
    }

    private double calculateTotalOptimizationScore(List<RouteAssignment> assignments, String optimizationType) {
        // Mock optimization score calculation
        double totalDistance = assignments.stream()
                .mapToDouble(RouteAssignment::getTotalDistance)
                .sum();
        
        double totalTime = assignments.stream()
                .mapToDouble(RouteAssignment::getEstimatedTime)
                .sum();
        
        double totalCost = assignments.stream()
                .mapToDouble(RouteAssignment::getEstimatedCost)
                .sum();

        // Return different scores based on optimization type
        switch (optimizationType.toLowerCase()) {
            case "distance":
                return 100.0 - (totalDistance * 0.1); // Lower distance = higher score
            case "time":
                return 100.0 - (totalTime * 0.05); // Lower time = higher score
            case "cost":
                return 100.0 - (totalCost * 0.2); // Lower cost = higher score
            case "efficiency":
                return (assignments.size() * 20.0) - (totalDistance * 0.05); // More assignments, less distance
            default:
                return 75.0; // Default score
        }
    }

    public List<VehicleDto> recommendVehicles(BookingDto booking) {
        // Mock vehicle recommendation based on booking type and requirements
        // In reality, this would use ML models to predict the best vehicle
        
        List<VehicleDto> recommendations = new ArrayList<>();
        
        // Mock recommendation logic based on booking type
        switch (booking.getType().toString()) {
            case "DELIVERY":
                // Recommend vans or trucks for delivery
                recommendations.add(createMockVehicle("VAN", "Ford", "Transit"));
                recommendations.add(createMockVehicle("TRUCK", "Mercedes", "Sprinter"));
                break;
            case "RIDE_SHARE":
                // Recommend sedans or SUVs for ride sharing
                recommendations.add(createMockVehicle("SEDAN", "Toyota", "Camry"));
                recommendations.add(createMockVehicle("SUV", "Honda", "CR-V"));
                break;
            case "FREIGHT":
                // Recommend trucks for freight
                recommendations.add(createMockVehicle("TRUCK", "Volvo", "FH16"));
                break;
            default:
                // Default recommendations
                recommendations.add(createMockVehicle("SEDAN", "Toyota", "Camry"));
                recommendations.add(createMockVehicle("SUV", "Honda", "CR-V"));
        }
        
        return recommendations;
    }

    private VehicleDto createMockVehicle(String type, String make, String model) {
        VehicleDto vehicle = new VehicleDto();
        vehicle.setId(System.currentTimeMillis() % 1000); // Mock ID
        vehicle.setLicensePlate("MOCK-" + (System.currentTimeMillis() % 10000));
        vehicle.setMake(make);
        vehicle.setModel(model);
        vehicle.setYear(2023);
        vehicle.setType(com.neurofleetx.entity.VehicleType.valueOf(type));
        vehicle.setStatus(com.neurofleetx.entity.VehicleStatus.AVAILABLE);
        vehicle.setCurrentLatitude(40.7128 + (Math.random() - 0.5) * 0.1);
        vehicle.setCurrentLongitude(-74.0060 + (Math.random() - 0.5) * 0.1);
        vehicle.setFuelLevel(75.0 + Math.random() * 25.0);
        vehicle.setHealthStatus("GOOD");
        return vehicle;
    }
}









