package com.neurofleetx.dto;

import java.util.List;

public class RouteOptimizationResponse {
    private List<RouteAssignment> assignments;
    private Double totalOptimizationScore;
    private String optimizationType;
    private String status;
    private String message;

    public RouteOptimizationResponse() {}

    public RouteOptimizationResponse(List<RouteAssignment> assignments, String optimizationType, String status) {
        this.assignments = assignments;
        this.optimizationType = optimizationType;
        this.status = status;
    }

    // Getters and Setters
    public List<RouteAssignment> getAssignments() {
        return assignments;
    }

    public void setAssignments(List<RouteAssignment> assignments) {
        this.assignments = assignments;
    }

    public Double getTotalOptimizationScore() {
        return totalOptimizationScore;
    }

    public void setTotalOptimizationScore(Double totalOptimizationScore) {
        this.totalOptimizationScore = totalOptimizationScore;
    }

    public String getOptimizationType() {
        return optimizationType;
    }

    public void setOptimizationType(String optimizationType) {
        this.optimizationType = optimizationType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}









