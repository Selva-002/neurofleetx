package com.neurofleetx.repository;

import com.neurofleetx.entity.Telemetry;
import com.neurofleetx.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TelemetryRepository extends JpaRepository<Telemetry, Long> {
    List<Telemetry> findByVehicleOrderByTimestampDesc(Vehicle vehicle);
    
    @Query("SELECT t FROM Telemetry t WHERE t.vehicle = :vehicle AND t.timestamp >= :startTime ORDER BY t.timestamp DESC")
    List<Telemetry> findByVehicleAndTimestampAfter(@Param("vehicle") Vehicle vehicle, @Param("startTime") LocalDateTime startTime);
    
    @Query("SELECT t FROM Telemetry t WHERE t.vehicle = :vehicle ORDER BY t.timestamp DESC LIMIT 1")
    Telemetry findLatestByVehicle(@Param("vehicle") Vehicle vehicle);
}









