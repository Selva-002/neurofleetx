package com.neurofleetx.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class DashboardMetrics {
    private Long totalVehicles;
    private Long availableVehicles;
    private Long vehiclesInUse;
    private Long vehiclesInMaintenance;
    private Long totalBookings;
    private Long pendingBookings;
    private Long completedBookings;
    private Long totalCustomers;
    private Double fleetUtilizationRate;
    private Double averageBookingValue;
    private List<MaintenanceAlert> criticalAlerts;
    private Map<String, Long> bookingsByType;
    private Map<String, Long> vehiclesByType;
    private Map<String, Long> bookingsByStatus;
    private Map<String, Long> vehiclesByStatus;
    private List<VehicleHealthReport> fleetHealthSummary;
    private LocalDateTime lastUpdated;
    
    // Admin-specific metrics
    private Double systemUptime;
    private Long activeUsers;
    private Integer systemAlerts;
    private String databaseSize;
    private Long apiCallsToday;
    private Double errorRate;
    
    // Dispatcher-specific metrics
    private Integer urgentTasks;
    private Integer pendingAssignments;
    private Integer routeOptimizations;
    private Double driverResponseTime;
    private Double fleetEfficiency;

    public DashboardMetrics() {
        this.lastUpdated = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getTotalVehicles() {
        return totalVehicles;
    }

    public void setTotalVehicles(Long totalVehicles) {
        this.totalVehicles = totalVehicles;
    }

    public Long getAvailableVehicles() {
        return availableVehicles;
    }

    public void setAvailableVehicles(Long availableVehicles) {
        this.availableVehicles = availableVehicles;
    }

    public Long getVehiclesInUse() {
        return vehiclesInUse;
    }

    public void setVehiclesInUse(Long vehiclesInUse) {
        this.vehiclesInUse = vehiclesInUse;
    }

    public Long getVehiclesInMaintenance() {
        return vehiclesInMaintenance;
    }

    public void setVehiclesInMaintenance(Long vehiclesInMaintenance) {
        this.vehiclesInMaintenance = vehiclesInMaintenance;
    }

    public Long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(Long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public Long getPendingBookings() {
        return pendingBookings;
    }

    public void setPendingBookings(Long pendingBookings) {
        this.pendingBookings = pendingBookings;
    }

    public Long getCompletedBookings() {
        return completedBookings;
    }

    public void setCompletedBookings(Long completedBookings) {
        this.completedBookings = completedBookings;
    }

    public Long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public Double getFleetUtilizationRate() {
        return fleetUtilizationRate;
    }

    public void setFleetUtilizationRate(Double fleetUtilizationRate) {
        this.fleetUtilizationRate = fleetUtilizationRate;
    }

    public Double getAverageBookingValue() {
        return averageBookingValue;
    }

    public void setAverageBookingValue(Double averageBookingValue) {
        this.averageBookingValue = averageBookingValue;
    }

    public List<MaintenanceAlert> getCriticalAlerts() {
        return criticalAlerts;
    }

    public void setCriticalAlerts(List<MaintenanceAlert> criticalAlerts) {
        this.criticalAlerts = criticalAlerts;
    }

    public Map<String, Long> getBookingsByType() {
        return bookingsByType;
    }

    public void setBookingsByType(Map<String, Long> bookingsByType) {
        this.bookingsByType = bookingsByType;
    }

    public Map<String, Long> getVehiclesByType() {
        return vehiclesByType;
    }

    public void setVehiclesByType(Map<String, Long> vehiclesByType) {
        this.vehiclesByType = vehiclesByType;
    }

    public Map<String, Long> getBookingsByStatus() {
        return bookingsByStatus;
    }

    public void setBookingsByStatus(Map<String, Long> bookingsByStatus) {
        this.bookingsByStatus = bookingsByStatus;
    }

    public Map<String, Long> getVehiclesByStatus() {
        return vehiclesByStatus;
    }

    public void setVehiclesByStatus(Map<String, Long> vehiclesByStatus) {
        this.vehiclesByStatus = vehiclesByStatus;
    }

    public List<VehicleHealthReport> getFleetHealthSummary() {
        return fleetHealthSummary;
    }

    public void setFleetHealthSummary(List<VehicleHealthReport> fleetHealthSummary) {
        this.fleetHealthSummary = fleetHealthSummary;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    // Admin-specific getters and setters
    public Double getSystemUptime() {
        return systemUptime;
    }

    public void setSystemUptime(Double systemUptime) {
        this.systemUptime = systemUptime;
    }

    public Long getActiveUsers() {
        return activeUsers;
    }

    public void setActiveUsers(Long activeUsers) {
        this.activeUsers = activeUsers;
    }

    public Integer getSystemAlerts() {
        return systemAlerts;
    }

    public void setSystemAlerts(Integer systemAlerts) {
        this.systemAlerts = systemAlerts;
    }

    public String getDatabaseSize() {
        return databaseSize;
    }

    public void setDatabaseSize(String databaseSize) {
        this.databaseSize = databaseSize;
    }

    public Long getApiCallsToday() {
        return apiCallsToday;
    }

    public void setApiCallsToday(Long apiCallsToday) {
        this.apiCallsToday = apiCallsToday;
    }

    public Double getErrorRate() {
        return errorRate;
    }

    public void setErrorRate(Double errorRate) {
        this.errorRate = errorRate;
    }

    // Dispatcher-specific getters and setters
    public Integer getUrgentTasks() {
        return urgentTasks;
    }

    public void setUrgentTasks(Integer urgentTasks) {
        this.urgentTasks = urgentTasks;
    }

    public Integer getPendingAssignments() {
        return pendingAssignments;
    }

    public void setPendingAssignments(Integer pendingAssignments) {
        this.pendingAssignments = pendingAssignments;
    }

    public Integer getRouteOptimizations() {
        return routeOptimizations;
    }

    public void setRouteOptimizations(Integer routeOptimizations) {
        this.routeOptimizations = routeOptimizations;
    }

    public Double getDriverResponseTime() {
        return driverResponseTime;
    }

    public void setDriverResponseTime(Double driverResponseTime) {
        this.driverResponseTime = driverResponseTime;
    }

    public Double getFleetEfficiency() {
        return fleetEfficiency;
    }

    public void setFleetEfficiency(Double fleetEfficiency) {
        this.fleetEfficiency = fleetEfficiency;
    }
}








