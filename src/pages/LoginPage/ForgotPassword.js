import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    passwordReminder: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://16.16.43.64:8080/api/auth/forgotpassword",
        formData
      );
      setSuccessMessage("Password changed successfully! Redirecting...");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setErrorMessage("Invalid credentials or reminder keyword.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={4} boxShadow={3} borderRadius={2} bgcolor="white" width={400}>
        <Typography variant="h5" align="center" mb={2}>
          Change Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username or Email"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Reminder Keyword"
            name="passwordReminder"
            value={formData.passwordReminder}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="New Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>

          {successMessage && <Box color="success.main" mt={2}>{successMessage}</Box>}
          {errorMessage && <Box color="error.main" mt={2}>{errorMessage}</Box>}
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
