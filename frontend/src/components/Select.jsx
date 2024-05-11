import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ arr, label, vehicle, setVehicle }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    const updatedVehicle = {
      ...vehicle,
      [label]: value // Using computed property names to set the key based on the label
    };
    setVehicle(updatedVehicle);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={vehicle[label] || ''} // Accessing the value based on the label
          label={label}
        >
          {arr.map((item, key) => (
            <MenuItem key={key} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
