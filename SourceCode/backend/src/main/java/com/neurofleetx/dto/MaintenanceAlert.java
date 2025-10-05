package com.neurofleetx.dto;

import java.time.LocalDateTime;

public class MaintenanceAlert {
    private Long id;
    private Long vehicleId;
    private String vehicleLicensePlate;
    private String alertType;
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private String description;
    private String recommendedAction;
    private LocalDateTime detectedAt;
    private LocalDateTime estimatedMaintenanceDate;
    private Double confidenceScore;
    private String status; // ACTIVE, ACKNOWLEDGED, RESOLVED

    public MaintenanceAlert() {}

    public MaintenanceAlert(Long vehicleId, String vehicleLicensePlate, String alertType, 
                           String severity, String description) {
        this.vehicleId = vehicleId;
        this.vehicleLicensePlate = vehicleLicensePlate;
        this.alertType = alertType;
        this.severity = severity;
        this.description = description;
        this.status = "ACTIVE";
        this.detectedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = alertType;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRecommendedAction() {
        return recommendedAction;
    }

    public void setRecommendedAction(String recommendedAction) {
        this.recommendedAction = recommendedAction;
    }

    public LocalDateTime getDetectedAt() {
        return detectedAt;
    }

    public void setDetectedAt(LocalDateTime detectedAt) {
        this.detectedAt = detectedAt;
    }

    public LocalDateTime getEstimatedMaintenanceDate() {
        return estimatedMaintenanceDate;
    }

    public void setEstimatedMaintenanceDate(LocalDateTime estimatedMaintenanceDate) {
        this.estimatedMaintenanceDate = estimatedMaintenanceDate;
    }

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}









