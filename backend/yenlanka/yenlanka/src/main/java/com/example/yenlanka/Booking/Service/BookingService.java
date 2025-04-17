package com.example.yenlanka.Booking.Service;
import com.example.yenlanka.Booking.DTO.BookingDto;
import com.example.yenlanka.Booking.Entity.Booking;
import com.example.yenlanka.Booking.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public BookingDto saveBooking(BookingDto bookingDto) {
        Booking booking = convertToEntity(bookingDto);
        booking = bookingRepository.save(booking);
        return convertToDto(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingDto getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByService(String service) {
        List<Booking> bookings = bookingRepository.findByService(service);
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByDate(LocalDate date) {
        List<Booking> bookings = bookingRepository.findByDate(date);
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getBookingsByEmail(String email) {
        List<Booking> bookings = bookingRepository.findByEmail(email);
        return bookings.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Convert entity to DTO
    private BookingDto convertToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setName(booking.getName());
        dto.setEmail(booking.getEmail());
        dto.setPhone(booking.getPhone());
        dto.setService(booking.getService());
        dto.setFabricType(booking.getFabricType());
        dto.setMeasurements(booking.getMeasurements());
        dto.setDate(booking.getDate().toString());
        dto.setTime(booking.getTime());
        dto.setNotes(booking.getNotes());

        // Convert byte[] to Base64 string if image exists
        if (booking.getImageData() != null && booking.getImageData().length > 0) {
            dto.setImageData(Base64.getEncoder().encodeToString(booking.getImageData()));
        }

        return dto;
    }

    // Convert DTO to entity
    private Booking convertToEntity(BookingDto dto) {
        Booking booking = new Booking();
        if (dto.getId() != null) {
            booking.setId(dto.getId());
        }

        booking.setName(dto.getName());
        booking.setEmail(dto.getEmail());
        booking.setPhone(dto.getPhone());
        booking.setService(dto.getService());
        booking.setFabricType(dto.getFabricType());
        booking.setMeasurements(dto.getMeasurements());
        booking.setDate(LocalDate.parse(dto.getDate(), DateTimeFormatter.ISO_DATE));
        booking.setTime(dto.getTime());
        booking.setNotes(dto.getNotes());

        // Convert Base64 string to byte[] if image exists
        if (dto.getImageData() != null && !dto.getImageData().isEmpty()) {
            booking.setImageData(Base64.getDecoder().decode(dto.getImageData()));
        }

        return booking;
    }
}