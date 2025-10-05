package com.neurofleetx.service;

import com.neurofleetx.entity.ERole;
import com.neurofleetx.entity.Role;
import com.neurofleetx.entity.User;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.entity.VehicleStatus;
import com.neurofleetx.entity.VehicleType;
import com.neurofleetx.repository.RoleRepository;
import com.neurofleetx.repository.UserRepository;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class DataInitializationService implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeUsers();
        initializeVehicles();
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            Role dispatcherRole = new Role(ERole.ROLE_DISPATCHER);
            Role customerRole = new Role(ERole.ROLE_CUSTOMER);

            roleRepository.save(adminRole);
            roleRepository.save(dispatcherRole);
            roleRepository.save(customerRole);
        }
    }

    private void initializeUsers() {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User("admin", "admin@neurofleetx.com", passwordEncoder.encode("admin123"));
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(roleRepository.findByName(ERole.ROLE_ADMIN).orElseThrow());
            admin.setRoles(adminRoles);
            userRepository.save(admin);

            // Create dispatcher user
            User dispatcher = new User("dispatcher", "dispatcher@neurofleetx.com", passwordEncoder.encode("dispatcher123"));
            Set<Role> dispatcherRoles = new HashSet<>();
            dispatcherRoles.add(roleRepository.findByName(ERole.ROLE_DISPATCHER).orElseThrow());
            dispatcher.setRoles(dispatcherRoles);
            userRepository.save(dispatcher);

            // Create customer user
            User customer = new User("customer", "customer@neurofleetx.com", passwordEncoder.encode("customer123"));
            Set<Role> customerRoles = new HashSet<>();
            customerRoles.add(roleRepository.findByName(ERole.ROLE_CUSTOMER).orElseThrow());
            customer.setRoles(customerRoles);
            userRepository.save(customer);
        }
    }

    private void initializeVehicles() {
        if (vehicleRepository.count() == 0) {
            // Create sample vehicles
            Vehicle vehicle1 = new Vehicle("ABC-123", "Toyota", "Camry", 2023, VehicleType.SEDAN);
            vehicle1.setCurrentLatitude(40.7128);
            vehicle1.setCurrentLongitude(-74.0060);
            vehicle1.setFuelLevel(85.5);
            vehicle1.setMileage(15000);
            vehicle1.setEngineHours(1200);
            vehicle1.setHealthStatus("GOOD");
            vehicleRepository.save(vehicle1);

            Vehicle vehicle2 = new Vehicle("XYZ-789", "Honda", "CR-V", 2023, VehicleType.SUV);
            vehicle2.setCurrentLatitude(40.7589);
            vehicle2.setCurrentLongitude(-73.9851);
            vehicle2.setFuelLevel(72.3);
            vehicle2.setMileage(22000);
            vehicle2.setEngineHours(1800);
            vehicle2.setHealthStatus("EXCELLENT");
            vehicleRepository.save(vehicle2);

            Vehicle vehicle3 = new Vehicle("DEF-456", "Ford", "Transit", 2022, VehicleType.VAN);
            vehicle3.setCurrentLatitude(40.6892);
            vehicle3.setCurrentLongitude(-74.0445);
            vehicle3.setFuelLevel(45.8);
            vehicle3.setMileage(45000);
            vehicle3.setEngineHours(3200);
            vehicle3.setHealthStatus("FAIR");
            vehicle3.setStatus(VehicleStatus.IN_USE);
            vehicleRepository.save(vehicle3);

            Vehicle vehicle4 = new Vehicle("GHI-789", "Mercedes", "Sprinter", 2023, VehicleType.TRUCK);
            vehicle4.setCurrentLatitude(40.7505);
            vehicle4.setCurrentLongitude(-73.9934);
            vehicle4.setFuelLevel(90.2);
            vehicle4.setMileage(8000);
            vehicle4.setEngineHours(600);
            vehicle4.setHealthStatus("GOOD");
            vehicleRepository.save(vehicle4);

            Vehicle vehicle5 = new Vehicle("JKL-012", "BMW", "X5", 2023, VehicleType.SUV);
            vehicle5.setCurrentLatitude(40.7614);
            vehicle5.setCurrentLongitude(-73.9776);
            vehicle5.setFuelLevel(65.7);
            vehicle5.setMileage(12000);
            vehicle5.setEngineHours(950);
            vehicle5.setHealthStatus("EXCELLENT");
            vehicle5.setStatus(VehicleStatus.MAINTENANCE);
            vehicleRepository.save(vehicle5);
        }
    }
}









