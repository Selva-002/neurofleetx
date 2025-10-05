package com.neurofleetx.service;

import com.neurofleetx.dto.VehicleDto;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.entity.VehicleStatus;
import com.neurofleetx.entity.VehicleType;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public List<VehicleDto> getAllVehicles() {
        return vehicleRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<VehicleDto> getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .map(this::convertToDto);
    }

    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        Vehicle vehicle = convertToEntity(vehicleDto);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return convertToDto(savedVehicle);
    }

    public Optional<VehicleDto> updateVehicle(Long id, VehicleDto vehicleDto) {
        return vehicleRepository.findById(id)
                .map(existingVehicle -> {
                    existingVehicle.setLicensePlate(vehicleDto.getLicensePlate());
                    existingVehicle.setMake(vehicleDto.getMake());
                    existingVehicle.setModel(vehicleDto.getModel());
                    existingVehicle.setYear(vehicleDto.getYear());
                    existingVehicle.setType(vehicleDto.getType());
                    existingVehicle.setStatus(vehicleDto.getStatus());
                    existingVehicle.setCurrentLatitude(vehicleDto.getCurrentLatitude());
                    existingVehicle.setCurrentLongitude(vehicleDto.getCurrentLongitude());
                    existingVehicle.setFuelLevel(vehicleDto.getFuelLevel());
                    existingVehicle.setMileage(vehicleDto.getMileage());
                    existingVehicle.setEngineHours(vehicleDto.getEngineHours());
                    existingVehicle.setHealthStatus(vehicleDto.getHealthStatus());
                    
                    Vehicle savedVehicle = vehicleRepository.save(existingVehicle);
                    return convertToDto(savedVehicle);
                });
    }

    public boolean deleteVehicle(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<VehicleDto> getVehiclesByStatus(VehicleStatus status) {
        return vehicleRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<VehicleDto> getVehiclesByType(VehicleType type) {
        return vehicleRepository.findByType(type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<VehicleDto> getAvailableVehicles() {
        return vehicleRepository.findAvailableVehiclesWithLocation(VehicleStatus.AVAILABLE).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long getVehicleCountByStatus(VehicleStatus status) {
        return vehicleRepository.countByStatus(status);
    }

    private VehicleDto convertToDto(Vehicle vehicle) {
        VehicleDto dto = new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setLicensePlate(vehicle.getLicensePlate());
        dto.setMake(vehicle.getMake());
        dto.setModel(vehicle.getModel());
        dto.setYear(vehicle.getYear());
        dto.setType(vehicle.getType());
        dto.setStatus(vehicle.getStatus());
        dto.setCurrentLatitude(vehicle.getCurrentLatitude());
        dto.setCurrentLongitude(vehicle.getCurrentLongitude());
        dto.setFuelLevel(vehicle.getFuelLevel());
        dto.setMileage(vehicle.getMileage());
        dto.setEngineHours(vehicle.getEngineHours());
        dto.setHealthStatus(vehicle.getHealthStatus());
        return dto;
    }

    private Vehicle convertToEntity(VehicleDto dto) {
        Vehicle vehicle = new Vehicle();
        vehicle.setLicensePlate(dto.getLicensePlate());
        vehicle.setMake(dto.getMake());
        vehicle.setModel(dto.getModel());
        vehicle.setYear(dto.getYear());
        vehicle.setType(dto.getType());
        vehicle.setStatus(dto.getStatus() != null ? dto.getStatus() : VehicleStatus.AVAILABLE);
        vehicle.setCurrentLatitude(dto.getCurrentLatitude());
        vehicle.setCurrentLongitude(dto.getCurrentLongitude());
        vehicle.setFuelLevel(dto.getFuelLevel());
        vehicle.setMileage(dto.getMileage());
        vehicle.setEngineHours(dto.getEngineHours());
        vehicle.setHealthStatus(dto.getHealthStatus());
        return vehicle;
    }
}









