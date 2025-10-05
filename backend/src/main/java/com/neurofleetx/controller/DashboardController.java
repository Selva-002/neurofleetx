package com.neurofleetx.controller;

import com.neurofleetx.dto.DashboardMetrics;
import com.neurofleetx.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    // Allow ADMIN, DISPATCHER, and CUSTOMER roles to access metrics
    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER') or hasRole('CUSTOMER')")
    public ResponseEntity<DashboardMetrics> getDashboardMetrics() {
        DashboardMetrics metrics = dashboardService.getDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }

    // Admin-specific dashboard metrics
    @GetMapping("/admin/metrics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DashboardMetrics> getAdminDashboardMetrics() {
        DashboardMetrics metrics = dashboardService.getAdminDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }

    // Dispatcher-specific dashboard metrics
    @GetMapping("/dispatcher/metrics")
    @PreAuthorize("hasRole('DISPATCHER')")
    public ResponseEntity<DashboardMetrics> getDispatcherDashboardMetrics() {
        DashboardMetrics metrics = dashboardService.getDispatcherDashboardMetrics();
        return ResponseEntity.ok(metrics);
    }
}



