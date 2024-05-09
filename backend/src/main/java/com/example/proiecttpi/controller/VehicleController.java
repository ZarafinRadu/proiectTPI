package com.example.proiecttpi.controller;
import com.example.proiecttpi.DTO.VehicleDTO;
import com.example.proiecttpi.entity.Vehicle;
import com.example.proiecttpi.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Register a new device
    @PostMapping("/register")
    @CrossOrigin
    public ResponseEntity<?> registerVehicle(@RequestBody VehicleDTO vehicleDTO) {
        try {
            Vehicle vehicle = vehicleService.registerVehicle(vehicleDTO);
            return ResponseEntity.ok().body(Map.of("message", "Vehicle added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Couldn't add vehicle"));
        }
    }

    // Update device information
    @PutMapping("/{vehicleId}/update")
    public ResponseEntity<?> updateVehicle(@PathVariable("vehicleId") Long deviceId, @RequestBody VehicleDTO vehicleDTO) {
        Vehicle updatedDevice = vehicleService.updateVehicle(deviceId, vehicleDTO);
        return ResponseEntity.ok(updatedDevice);
    }

    // Remove device
    @DeleteMapping("/{vehicleId}/remove")
    public ResponseEntity<?> removeVehicle(@PathVariable("vehicleId") Long deviceId) {
        vehicleService.removeVehicle(deviceId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/locations")
    @CrossOrigin
    public List<Vehicle> getVehicles(){
        return vehicleService.getAllVehicleLocations();
    }
}

