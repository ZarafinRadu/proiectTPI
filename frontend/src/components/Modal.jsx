import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicSelect from './Select';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object({
  type: Yup.string().required('Type is required'),
  serialNumber: Yup.string().required('Serial Number is required'),
  make: Yup.string().required('Make is required'),
  model: Yup.string().required('Model is required'),
  year: Yup.number().required('Year is required').min(2005, 'Year must be at least 2005').max(new Date().getFullYear(), 'Year cannot be in the future'),
});

export default function BasicModal({open, setOpen}) {

  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      type: '',
      serialNumber: '',
      make: '',
      model: '',
      year: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: currentYear - 2004 }, (_, index) => currentYear - index);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom:'10px'}}>
            Choose option
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <BasicSelect 
              arr={['Add', 'Remove', 'Edit']} 
              label='Type' 
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            />
          </form>
          <Button 
              type="submit" 
              variant="contained" 
              sx={{marginTop:'15px'}}
            >
              Submit
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
