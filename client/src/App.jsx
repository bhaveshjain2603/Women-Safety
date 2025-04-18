import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper
} from "@mui/material";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    userEmail: "",
    location: "",
    familyContact: "",
    message: ""
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const locationName = data.display_name;

            setFormData((prevData) => ({
              ...prevData,
              location: locationName
            }));
          } catch (error) {
            console.error("Error fetching location name:", error);
          }
        },
        (error) => {
          console.error("Error fetching coordinates:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, formData);
      toast.success(
        "User data saved successfully!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(
        "Failed to submit form!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const sendEmergencyAlert = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/alert`, formData);
      toast.success(
        "Emergency alert sent to family members!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(
        "Failed to send mail!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <>
    <ToastContainer />
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Women Safety App
          </Typography>
          <form onSubmit={submitForm}>
            <Grid container spacing={2}>
              <Grid item xs={20}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Your Email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location (Auto-filled)"
                  name="location"
                  value={formData.location}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Family Contact Email"
                  name="familyContact"
                  value={formData.familyContact}
                  onChange={handleInputChange}
                  placeholder="e.g., family@example.com"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message (optional)"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ pt: 2 }}>
              <Grid item xs={12}>
                <Button
                  onClick={sendEmergencyAlert}
                  variant="contained"
                  color="error"
                  fullWidth
                >
                  Send Emergency Alert
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={submitForm}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
    </>
  );
}

export default App;
