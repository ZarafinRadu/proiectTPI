import { TextField} from "@mui/material"
import BasicSelect from "./Select"
import { useState } from "react";
import { useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
export default function RemoveVehicle(){
    const [vehicles,setVehicles] = useState([])
    useEffect(()=>{
        const fetchVehicles = async () =>{
            const response = await fetch('http://localhost:8080/api/vehicle/locations')
            const res = await response.json();
            setVehicles(res)
            console.log(res)
        }
        fetchVehicles()
    },[])
    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/vehicle/${id}/remove`,{
                method:'DELETE',
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
            if (response.ok) {
                const updatedVehicles = await response.json(); // Assuming the server sends back the updated list
                setVehicles(updatedVehicles);
            } else {
                console.error('Error removing vehicle:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing vehicle:', error);
        }
    };
    
    return(
        <Grid container spacing={2}>
      {vehicles.map((vehicle, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {vehicle.vehicleType} - {vehicle.make} {vehicle.model} ({vehicle.year})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Serial Number: {vehicle.serialNumber}
              </Typography>
              <Button variant="outlined" color="error" onClick={() => handleRemove(vehicle.id)}>
                    Remove
                </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    )
}