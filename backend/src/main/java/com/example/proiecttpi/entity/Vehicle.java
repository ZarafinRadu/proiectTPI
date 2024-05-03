package com.example.proiecttpi.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String vehicleType;

    @Column(nullable = false)
    private String serialNumber;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String year;

    private Double latitude = 44.42;
    private Double longitude = 26.1;
    private Instant lastUpdate;
}
