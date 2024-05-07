import React, { useState, useRef } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setInitialFavorites } from '../state'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Typography } from "@material-ui/core";
import { Navigate, Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const LoginForm = () => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [forgotPW, setForgotPW] = useState(false);
  const errorMessage = useRef("");
  const severity = useRef('error');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(value);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const forgotPasswordChange = () => {
    setForgotPW(true);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const registerSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
    confirmPassword: yup
      .string()
      .required("required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  const initialValuesRegister = {
    userName:"",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialValuesLogin = {
    userName: "",
    password: "",
  };
  const register = async (values, onSubmitProps) => {
    const copy = { ...values };
    console.log(copy)
    delete copy.confirmPassword;
    const savedUserResponse = await fetch(
      "http://localhost:8080/auth/addNewUser",
      {
        method: "POST",
        body: JSON.stringify({ ...copy, roles:'ROLE_USER',picturePath: "" }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const res = await savedUserResponse.json();
    if (res) {
      setOpen(true);
      errorMessage.current = res.message;
      if(savedUserResponse.status >= 200 && savedUserResponse.status < 300){
        severity.current='success'
        setValue(1);
      }else{
        severity.current='error'
      }
    }
    onSubmitProps.resetForm();
  };
  const login = async (values, onSubmitProps) => {
    console.log(values)
    const savedUserResponse = await fetch("http://localhost:8080/auth/generateToken", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const res = await savedUserResponse.json();
    console.log(res);
    if (res.token) {
      dispatch(
        setLogin({
          token: res.token,
        })
      );
      navigate("/home");
    } else if (res.message) {
      setOpen(true);
      errorMessage.current = res.message;
      severity.current = 'error';
    }
  };
  const changePassword = async (values) => {
    console.log(values);
    const patchChangePassword = await fetch("http://localhost:9000/change", {
      method: "PATCH",
      body: JSON.stringify(values),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const res = await patchChangePassword.json();
    console.log(res);
    if (res.message === "Password changed successfully!") {
      errorMessage.current = res.message;
      setForgotPW(false);
      setOpen(true);
    } else {
      setOpen(true);
      errorMessage.current = res.message;
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "sm", marginLeft: "auto", marginRight: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sign Up" {...a11yProps(0)} />
          <Tab label="Log In" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Formik
          onSubmit={register}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="User Name"
                    variant="outlined"
                    name="userName"
                    onBlur={handleBlur}
                    onChange={(e) => setFieldValue('userName', e.target.value)}
                    value={values.userName}
                    error={
                      Boolean(touched.userName) && Boolean(errors.userName)
                    }
                    helperText={touched.userName && errors.userName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    error={
                      Boolean(touched.confirmPassword) &&
                      Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {forgotPW ? (
          <Formik
            onSubmit={changePassword}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.login_email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        ) : (
          <Formik
            onSubmit={login}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="User Name"
                      variant="outlined"
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.userName}
                      error={Boolean(touched.userName) && Boolean(errors.userName)}
                      helperText={touched.userName && errors.userName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Link onClick={forgotPasswordChange}>
                      Forgot Password ?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Log In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        )}
      </TabPanel>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            severity={severity.current}
            sx={{ width: "100%" }}
          >
            {errorMessage.current}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default LoginForm;