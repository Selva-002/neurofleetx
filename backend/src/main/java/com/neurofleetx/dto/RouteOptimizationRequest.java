package com.neurofleetx.dto;

import java.util.List;

public class RouteOptimizationRequest {
    private List<BookingDto> bookings;
    private List<VehicleDto> availableVehicles;
    private String optimizationType; // "distance", "time", "cost", "efficiency"

    public RouteOptimizationRequest() {}

    public RouteOptimizationRequest(List<BookingDto> bookings, List<VehicleDto> availableVehicles, String optimizationType) {
        this.bookings = bookings;
        this.availableVehicles = availableVehicles;
        this.optimizationType = optimizationType;
    }

    public List<BookingDto> getBookings() {
        return bookings;
    }

    public void setBookings(List<BookingDto> bookings) {
        this.bookings = bookings;
    }

    public List<VehicleDto> getAvailableVehicles() {
        return availableVehicles;
    }

    public void setAvailableVehicles(List<VehicleDto> availableVehicles) {
        this.availableVehicles = availableVehicles;
    }

    public String getOptimizationType() {
        return optimizationType;
    }

    public void setOptimizationType(String optimizationType) {
        this.optimizationType = optimizationType;
    }
}









