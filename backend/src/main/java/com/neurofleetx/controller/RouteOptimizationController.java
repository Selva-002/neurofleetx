package com.neurofleetx.controller;

import com.neurofleetx.dto.*;
import com.neurofleetx.service.RouteOptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/optimize")
public class RouteOptimizationController {
    @Autowired
    private RouteOptimizationService routeOptimizationService;

    @PostMapping("/routes")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<RouteOptimizationResponse> optimizeRoutes(@Valid @RequestBody RouteOptimizationRequest request) {
        try {
            RouteOptimizationResponse response = routeOptimizationService.optimizeRoutes(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            RouteOptimizationResponse errorResponse = new RouteOptimizationResponse();
            errorResponse.setStatus("ERROR");
            errorResponse.setMessage("Failed to optimize routes: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/recommend-vehicles")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER') or hasRole('CUSTOMER')")
    public ResponseEntity<?> recommendVehicles(@Valid @RequestBody BookingDto booking) {
        try {
            var recommendations = routeOptimizationService.recommendVehicles(booking);
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get vehicle recommendations: " + e.getMessage());
        }
    }
}









