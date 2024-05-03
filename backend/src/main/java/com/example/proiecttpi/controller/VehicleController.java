package com.example.proiecttpi.controller;
import com.example.proiecttpi.DTO.VehicleDTO;
import com.example.proiecttpi.entity.Vehicle;
import com.example.proiecttpi.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // Register a new device
    @PostMapping("/register")
    public ResponseEntity<?> registerVehicle(@RequestBody VehicleDTO vehicleDTO) {
        Vehicle vehicle = vehicleService.registerVehicle(vehicleDTO);
        return ResponseEntity.ok(vehicle);
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
}

