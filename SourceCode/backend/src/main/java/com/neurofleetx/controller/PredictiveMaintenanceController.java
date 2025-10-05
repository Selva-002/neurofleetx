package com.neurofleetx.controller;

import com.neurofleetx.dto.MaintenanceAlert;
import com.neurofleetx.dto.VehicleHealthReport;
import com.neurofleetx.service.PredictiveMaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/maintenance")
public class PredictiveMaintenanceController {
    @Autowired
    private PredictiveMaintenanceService maintenanceService;

    @GetMapping("/health-report/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<VehicleHealthReport> getVehicleHealthReport(@PathVariable Long vehicleId) {
        try {
            VehicleHealthReport report = maintenanceService.generateHealthReport(vehicleId);
            return ResponseEntity.ok(report);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/alerts")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<List<MaintenanceAlert>> getActiveAlerts() {
        List<MaintenanceAlert> alerts = maintenanceService.getActiveAlerts();
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/alerts/vehicle/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<List<MaintenanceAlert>> getAlertsByVehicle(@PathVariable Long vehicleId) {
        List<MaintenanceAlert> alerts = maintenanceService.getAlertsByVehicle(vehicleId);
        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/alerts/critical")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<List<MaintenanceAlert>> getCriticalAlerts() {
        List<MaintenanceAlert> alerts = maintenanceService.getCriticalAlerts();
        return ResponseEntity.ok(alerts);
    }
}









