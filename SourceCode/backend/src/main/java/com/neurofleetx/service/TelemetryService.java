package com.neurofleetx.service;

import com.neurofleetx.dto.TelemetryDto;
import com.neurofleetx.entity.Telemetry;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.TelemetryRepository;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TelemetryService {
    @Autowired
    private TelemetryRepository telemetryRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    public TelemetryDto createTelemetry(TelemetryDto telemetryDto) {
        Vehicle vehicle = vehicleRepository.findById(telemetryDto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        Telemetry telemetry = convertToEntity(telemetryDto, vehicle);
        Telemetry savedTelemetry = telemetryRepository.save(telemetry);
        
        // Update vehicle's current location and metrics
        updateVehicleMetrics(vehicle, telemetryDto);
        
        return convertToDto(savedTelemetry);
    }

    public List<TelemetryDto> getTelemetryByVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        return telemetryRepository.findByVehicleOrderByTimestampDesc(vehicle).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TelemetryDto> getRecentTelemetryByVehicle(Long vehicleId, int hours) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        LocalDateTime startTime = LocalDateTime.now().minusHours(hours);
        return telemetryRepository.findByVehicleAndTimestampAfter(vehicle, startTime).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<TelemetryDto> getLatestTelemetryByVehicle(Long vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        
        Telemetry telemetry = telemetryRepository.findLatestByVehicle(vehicle);
        return telemetry != null ? Optional.of(convertToDto(telemetry)) : Optional.empty();
    }

    private void updateVehicleMetrics(Vehicle vehicle, TelemetryDto telemetryDto) {
        vehicle.setCurrentLatitude(telemetryDto.getLatitude());
        vehicle.setCurrentLongitude(telemetryDto.getLongitude());
        if (telemetryDto.getFuelLevel() != null) {
            vehicle.setFuelLevel(telemetryDto.getFuelLevel());
        }
        if (telemetryDto.getHealthMetrics() != null) {
            vehicle.setHealthStatus(telemetryDto.getHealthMetrics());
        }
        vehicleRepository.save(vehicle);
    }

    private TelemetryDto convertToDto(Telemetry telemetry) {
        TelemetryDto dto = new TelemetryDto();
        dto.setId(telemetry.getId());
        dto.setVehicleId(telemetry.getVehicle().getId());
        dto.setLatitude(telemetry.getLatitude());
        dto.setLongitude(telemetry.getLongitude());
        dto.setSpeed(telemetry.getSpeed());
        dto.setFuelLevel(telemetry.getFuelLevel());
        dto.setEngineRpm(telemetry.getEngineRpm());
        dto.setEngineTemperature(telemetry.getEngineTemperature());
        dto.setBatteryVoltage(telemetry.getBatteryVoltage());
        dto.setDiagnosticCodes(telemetry.getDiagnosticCodes());
        dto.setHealthMetrics(telemetry.getHealthMetrics());
        dto.setTimestamp(telemetry.getTimestamp());
        return dto;
    }

    private Telemetry convertToEntity(TelemetryDto dto, Vehicle vehicle) {
        Telemetry telemetry = new Telemetry(vehicle, dto.getLatitude(), dto.getLongitude());
        telemetry.setSpeed(dto.getSpeed());
        telemetry.setFuelLevel(dto.getFuelLevel());
        telemetry.setEngineRpm(dto.getEngineRpm());
        telemetry.setEngineTemperature(dto.getEngineTemperature());
        telemetry.setBatteryVoltage(dto.getBatteryVoltage());
        telemetry.setDiagnosticCodes(dto.getDiagnosticCodes());
        telemetry.setHealthMetrics(dto.getHealthMetrics());
        return telemetry;
    }
}

