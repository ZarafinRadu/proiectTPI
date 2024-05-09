package com.example.proiecttpi.service;

import com.example.proiecttpi.DTO.VehicleDTO;
import com.example.proiecttpi.entity.Vehicle;

import java.util.List;

public interface VehicleService {
    Vehicle registerVehicle(VehicleDTO vehicleDTO);
    Vehicle updateVehicle(Long deviceId, VehicleDTO vehicleDTO);

    List<Vehicle> getAllVehicleLocations();
    void removeVehicle(Long vehicleId);
}

