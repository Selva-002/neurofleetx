package com.neurofleetx.repository;

import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.entity.VehicleStatus;
import com.neurofleetx.entity.VehicleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByStatus(VehicleStatus status);
    List<Vehicle> findByType(VehicleType type);
    List<Vehicle> findByStatusAndType(VehicleStatus status, VehicleType type);
    
    @Query("SELECT v FROM Vehicle v WHERE v.status = :status AND v.currentLatitude IS NOT NULL AND v.currentLongitude IS NOT NULL")
    List<Vehicle> findAvailableVehiclesWithLocation(@Param("status") VehicleStatus status);
    
    @Query("SELECT COUNT(v) FROM Vehicle v WHERE v.status = :status")
    Long countByStatus(@Param("status") VehicleStatus status);
}









