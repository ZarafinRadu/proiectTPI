package com.example.proiecttpi.service;

import com.example.proiecttpi.DTO.VehicleDTO;
import com.example.proiecttpi.entity.Vehicle;

public interface VehicleService {
    Vehicle registerVehicle(VehicleDTO vehicleDTO);
    Vehicle updateVehicle(Long deviceId, VehicleDTO vehicleDTO);
    void removeVehicle(Long vehicleId);
}

