package com.neurofleetx.dto;

import java.time.LocalDateTime;
import java.util.List;

public class VehicleHealthReport {
    private Long vehicleId;
    private String vehicleLicensePlate;
    private String overallHealthStatus; // EXCELLENT, GOOD, FAIR, POOR, CRITICAL
    private Double healthScore; // 0-100
    private List<MaintenanceAlert> activeAlerts;
    private List<MaintenanceAlert> upcomingMaintenance;
    private Double fuelEfficiency;
    private Integer totalMileage;
    private Integer engineHours;
    private String lastServiceDate;
    private String nextServiceDue;
    private LocalDateTime generatedAt;

    public VehicleHealthReport() {}

    public VehicleHealthReport(Long vehicleId, String vehicleLicensePlate) {
        this.vehicleId = vehicleId;
        this.vehicleLicensePlate = vehicleLicensePlate;
        this.generatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehicleLicensePlate() {
        return vehicleLicensePlate;
    }

    public void setVehicleLicensePlate(String vehicleLicensePlate) {
        this.vehicleLicensePlate = vehicleLicensePlate;
    }

    public String getOverallHealthStatus() {
        return overallHealthStatus;
    }

    public void setOverallHealthStatus(String overallHealthStatus) {
        this.overallHealthStatus = overallHealthStatus;
    }

    public Double getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(Double healthScore) {
        this.healthScore = healthScore;
    }

    public List<MaintenanceAlert> getActiveAlerts() {
        return activeAlerts;
    }

    public void setActiveAlerts(List<MaintenanceAlert> activeAlerts) {
        this.activeAlerts = activeAlerts;
    }

    public List<MaintenanceAlert> getUpcomingMaintenance() {
        return upcomingMaintenance;
    }

    public void setUpcomingMaintenance(List<MaintenanceAlert> upcomingMaintenance) {
        this.upcomingMaintenance = upcomingMaintenance;
    }

    public Double getFuelEfficiency() {
        return fuelEfficiency;
    }

    public void setFuelEfficiency(Double fuelEfficiency) {
        this.fuelEfficiency = fuelEfficiency;
    }

    public Integer getTotalMileage() {
        return totalMileage;
    }

    public void setTotalMileage(Integer totalMileage) {
        this.totalMileage = totalMileage;
    }

    public Integer getEngineHours() {
        return engineHours;
    }

    public void setEngineHours(Integer engineHours) {
        this.engineHours = engineHours;
    }

    public String getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(String lastServiceDate) {
        this.lastServiceDate = lastServiceDate;
    }

    public String getNextServiceDue() {
        return nextServiceDue;
    }

    public void setNextServiceDue(String nextServiceDue) {
        this.nextServiceDue = nextServiceDue;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}









