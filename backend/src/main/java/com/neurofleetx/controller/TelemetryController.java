package com.neurofleetx.controller;

import com.neurofleetx.dto.TelemetryDto;
import com.neurofleetx.service.TelemetryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {
    @Autowired
    private TelemetryService telemetryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<TelemetryDto> createTelemetry(@Valid @RequestBody TelemetryDto telemetryDto) {
        try {
            TelemetryDto createdTelemetry = telemetryService.createTelemetry(telemetryDto);
            return ResponseEntity.ok(createdTelemetry);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/vehicle/{vehicleId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<List<TelemetryDto>> getTelemetryByVehicle(@PathVariable Long vehicleId) {
        try {
            List<TelemetryDto> telemetryData = telemetryService.getTelemetryByVehicle(vehicleId);
            return ResponseEntity.ok(telemetryData);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/vehicle/{vehicleId}/recent/{hours}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<List<TelemetryDto>> getRecentTelemetryByVehicle(
            @PathVariable Long vehicleId, 
            @PathVariable int hours) {
        try {
            List<TelemetryDto> telemetryData = telemetryService.getRecentTelemetryByVehicle(vehicleId, hours);
            return ResponseEntity.ok(telemetryData);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/vehicle/{vehicleId}/latest")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DISPATCHER')")
    public ResponseEntity<TelemetryDto> getLatestTelemetryByVehicle(@PathVariable Long vehicleId) {
        try {
            Optional<TelemetryDto> telemetry = telemetryService.getLatestTelemetryByVehicle(vehicleId);
            return telemetry.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}









