import { TextField, Button, Grid } from "@mui/material"
import BasicSelect from "./Select"
import { useState } from "react";
export default function AddVehicle(){
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 2004 }, (_, index) => currentYear - index);
    const [vehicle,setVehicle] = useState({})
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(vehicle)
        const response = await fetch('http://localhost:8080/api/vehicle/register',{
            method:'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body:JSON.stringify(vehicle)
        })
        const res = await response.json()
        console.log(res)
    }
    return<form onSubmit={(e)=>handleSubmit(e)}> 
    <Grid>
        <Grid item xs={12}>
    <BasicSelect 
             vehicle = {vehicle}
             setVehicle = {setVehicle}
              arr={['Truck','Van']} 
              label='vehicleType' 
              name="vehicleType"
            />
        </Grid>
        <Grid item xs={12}>
    <TextField 
    onChange={(e)=>setVehicle({...vehicle,serialNumber:e.target.value})}
    fullWidth
              id="serialNumber" 
              name="serialNumber"
              label="Serial Number" 
              variant="outlined" 
              sx={{ marginTop:'15px'}} 
            />
        </Grid>
        <Grid item xs={12}>
            <TextField 
            onChange={(e)=>setVehicle({...vehicle,make:e.target.value})}
            fullWidth
              id="make" 
              name="make"
              label="Make" 
              variant="outlined" 
              sx={{ marginTop:'15px'}} 
            />
        </Grid>
        <Grid item xs={12}>
            <TextField 
            onChange={(e)=>setVehicle({...vehicle,model:e.target.value})}
            fullWidth
              id="model" 
              name="model"
              label="Model" 
              variant="outlined" 
              sx={{ marginTop:'15px', marginBottom:'15px'}} 
            />
        </Grid>
        <Grid item xs={12}>
             <BasicSelect 
              vehicle = {vehicle}
              setVehicle = {setVehicle}
              arr={yearsArray} 
              label='year'
              name="year"
            /> 
        </Grid>
        <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{marginTop:'15px'}}
            >
              Submit
            </Button>
        </Grid>
    </Grid>
    </form>
}