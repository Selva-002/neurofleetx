package com.neurofleetx.dto;

import java.util.List;

public class RouteAssignment {
    private Long vehicleId;
    private String vehicleLicensePlate;
    private List<BookingDto> assignedBookings;
    private Double totalDistance;
    private Double estimatedTime;
    private Double estimatedCost;
    private String routeDescription;

    public RouteAssignment() {}

    public RouteAssignment(Long vehicleId, String vehicleLicensePlate, List<BookingDto> assignedBookings) {
        this.vehicleId = vehicleId;
        this.vehicleLicensePlate = vehicleLicensePlate;
        this.assignedBookings = assignedBookings;
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

    public List<BookingDto> getAssignedBookings() {
        return assignedBookings;
    }

    public void setAssignedBookings(List<BookingDto> assignedBookings) {
        this.assignedBookings = assignedBookings;
    }

    public Double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(Double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public Double getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(Double estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public String getRouteDescription() {
        return routeDescription;
    }

    public void setRouteDescription(String routeDescription) {
        this.routeDescription = routeDescription;
    }
}









