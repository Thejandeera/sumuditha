package com.example.yenlanka.Booking.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Base64;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String service;
    private String fabricType;
    private String measurements;
    private String date;
    private String time;
    private String notes;
    private String imageData; // Base64 encoded string
}