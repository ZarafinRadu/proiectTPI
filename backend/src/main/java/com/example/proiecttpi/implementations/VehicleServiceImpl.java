package com.example.proiecttpi.implementations;

import com.example.proiecttpi.DTO.VehicleDTO;
import com.example.proiecttpi.entity.Vehicle;
import com.example.proiecttpi.repository.VehicleRepository;
import com.example.proiecttpi.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Vehicle registerVehicle(VehicleDTO vehicleDTO) {
        // Convert DTO to entity and save
        Vehicle vehicle = convertToVehicleEntity(vehicleDTO);
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Long vehicleId, VehicleDTO vehicleDTO) {
        try {
            Vehicle existingVehicle = vehicleRepository.findById(vehicleId)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);

            existingVehicle.setVehicleType(vehicleDTO.getVehicleType());
            existingVehicle.setSerialNumber(vehicleDTO.getSerialNumber());
            existingVehicle.setMake(vehicleDTO.getMake());
            existingVehicle.setModel(vehicleDTO.getModel());
            existingVehicle.setYear(vehicleDTO.getYear());

            return vehicleRepository.save(existingVehicle);
        } catch (ChangeSetPersister.NotFoundException ex) {
            System.err.println("Vehicle not found: " + ex.getMessage());
            return null;
        }
    }

    @Override
    public List<Vehicle> getAllVehicleLocations() {
        return vehicleRepository.findAll();
    }


    @Override
    public void removeVehicle(Long deviceId) {
        try{
        Vehicle existingDevice = vehicleRepository.findById(deviceId)
                .orElseThrow(ChangeSetPersister.NotFoundException::new);
        vehicleRepository.delete(existingDevice);}
        catch(ChangeSetPersister.NotFoundException ex){
            System.err.println("Vehicle not found: " + ex.getMessage());
        }
    }

    private Vehicle convertToVehicleEntity(VehicleDTO vehicleDTO) {
        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleType(vehicleDTO.getVehicleType());
        vehicle.setSerialNumber(vehicleDTO.getSerialNumber());
        vehicle.setMake(vehicleDTO.getMake());
        vehicle.setModel(vehicleDTO.getModel());
        vehicle.setYear(vehicleDTO.getYear());
        return vehicle;
    }
}

