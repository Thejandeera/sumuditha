package com.example.yenlanka.Booking.Repository;

import com.example.yenlanka.Booking.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find bookings by service type
    List<Booking> findByService(String service);

    // Find bookings by date
    List<Booking> findByDate(LocalDate date);

    // Find bookings by customer email
    List<Booking> findByEmail(String email);

    // Find bookings between date range
    List<Booking> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
