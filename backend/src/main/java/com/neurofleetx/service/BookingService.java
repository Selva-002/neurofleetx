package com.neurofleetx.service;

import com.neurofleetx.dto.BookingDto;
import com.neurofleetx.entity.Booking;
import com.neurofleetx.entity.BookingStatus;
import com.neurofleetx.entity.User;
import com.neurofleetx.entity.Vehicle;
import com.neurofleetx.repository.BookingRepository;
import com.neurofleetx.repository.UserRepository;
import com.neurofleetx.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    public BookingDto createBooking(BookingDto bookingDto) {
        User customer = userRepository.findById(bookingDto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Booking booking = convertToEntity(bookingDto, customer);
        Booking savedBooking = bookingRepository.save(booking);
        return convertToDto(savedBooking);
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getBookingsByCustomer(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        return bookingRepository.findByCustomerOrderByCreatedAtDesc(customer).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<BookingDto> getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(this::convertToDto);
    }

    public Optional<BookingDto> updateBooking(Long id, BookingDto bookingDto) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    existingBooking.setPickupLatitude(bookingDto.getPickupLatitude());
                    existingBooking.setPickupLongitude(bookingDto.getPickupLongitude());
                    existingBooking.setDropLatitude(bookingDto.getDropLatitude());
                    existingBooking.setDropLongitude(bookingDto.getDropLongitude());
                    existingBooking.setPickupAddress(bookingDto.getPickupAddress());
                    existingBooking.setDropAddress(bookingDto.getDropAddress());
                    existingBooking.setType(bookingDto.getType());
                    existingBooking.setStatus(bookingDto.getStatus());
                    existingBooking.setScheduledTime(bookingDto.getScheduledTime());
                    existingBooking.setSpecialRequirements(bookingDto.getSpecialRequirements());
                    existingBooking.setEstimatedCost(bookingDto.getEstimatedCost());
                    existingBooking.setActualCost(bookingDto.getActualCost());
                    
                    if (bookingDto.getVehicleId() != null) {
                        Vehicle vehicle = vehicleRepository.findById(bookingDto.getVehicleId())
                                .orElse(null);
                        existingBooking.setVehicle(vehicle);
                    }
                    
                    Booking savedBooking = bookingRepository.save(existingBooking);
                    return convertToDto(savedBooking);
                });
    }

    public boolean deleteBooking(Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<BookingDto> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Long getBookingCountByStatus(BookingStatus status) {
        return bookingRepository.countByStatus(status);
    }

    public Long getBookingCountSince(LocalDateTime startDate) {
        return bookingRepository.countByCreatedAtAfter(startDate);
    }

    private BookingDto convertToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setCustomerId(booking.getCustomer().getId());
        dto.setVehicleId(booking.getVehicle() != null ? booking.getVehicle().getId() : null);
        dto.setPickupLatitude(booking.getPickupLatitude());
        dto.setPickupLongitude(booking.getPickupLongitude());
        dto.setDropLatitude(booking.getDropLatitude());
        dto.setDropLongitude(booking.getDropLongitude());
        dto.setPickupAddress(booking.getPickupAddress());
        dto.setDropAddress(booking.getDropAddress());
        dto.setType(booking.getType());
        dto.setStatus(booking.getStatus());
        dto.setScheduledTime(booking.getScheduledTime());
        dto.setCompletedTime(booking.getCompletedTime());
        dto.setSpecialRequirements(booking.getSpecialRequirements());
        dto.setEstimatedCost(booking.getEstimatedCost());
        dto.setActualCost(booking.getActualCost());
        dto.setCreatedAt(booking.getCreatedAt());
        dto.setUpdatedAt(booking.getUpdatedAt());
        return dto;
    }

    private Booking convertToEntity(BookingDto dto, User customer) {
        Booking booking = new Booking(customer, dto.getPickupLatitude(), dto.getPickupLongitude(),
                dto.getDropLatitude(), dto.getDropLongitude(), dto.getType());
        
        booking.setPickupAddress(dto.getPickupAddress());
        booking.setDropAddress(dto.getDropAddress());
        booking.setScheduledTime(dto.getScheduledTime());
        booking.setSpecialRequirements(dto.getSpecialRequirements());
        booking.setEstimatedCost(dto.getEstimatedCost());
        booking.setActualCost(dto.getActualCost());
        
        if (dto.getVehicleId() != null) {
            Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId()).orElse(null);
            booking.setVehicle(vehicle);
        }
        
        return booking;
    }
}









