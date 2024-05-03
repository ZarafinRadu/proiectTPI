package com.example.proiecttpi.locationGenerator;

import com.example.proiecttpi.entity.Vehicle;
import com.example.proiecttpi.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class MockLocationGenerator {

    @Autowired
    private final VehicleRepository vehicleRepository;
    private static final List<LatLng> route = Arrays.asList(
            new LatLng(44.4268, 26.1025),  // Bucharest
            new LatLng(45.9432, 24.9668),  // Cluj-Napoca
            new LatLng(47.1515, 27.5877),  // Iași
            new LatLng(44.4377, 26.0974)   // Constanta
            // Add more waypoints as needed
    );

    // Simulate movement along predefined route
    private int currentIndex = 0; // Current index in the route
    private double distanceIncrement = 0.1; // Increment for movement (adjust as needed)

    public MockLocationGenerator(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Scheduled(fixedRate = 1000) // Update every second
    public void generateMockLocations() {
        // Get current waypoint
        LatLng currentWaypoint = route.get(currentIndex);

        // Generate latitude and longitude with random deviation
        double latitude = currentWaypoint.latitude + generateRandomDeviation();
        double longitude = currentWaypoint.longitude + generateRandomDeviation();

        List<Vehicle> vehicles = vehicleRepository.findAll();
        // Update vehicle's location

        for(Vehicle vehicle:vehicles) {
            vehicle.setLatitude(latitude);
            vehicle.setLongitude(longitude);
            vehicle.setLastUpdate(Instant.now());
            vehicleRepository.save(vehicle); // Save updated vehicle to the database
        }
        // Move to the next waypoint
        currentIndex = (currentIndex + 1) % route.size();
    }

    // Generate random deviation for more realistic movement
    private double generateRandomDeviation() {
        return ThreadLocalRandom.current().nextDouble(-0.01, 0.01); // Adjust range as needed
    }
}

