import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordReminder: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Şifreyi kontrol et
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must contain at least 8 characters, one uppercase, one lowercase, and one number.");
      return;
    }

    try {
      await axios.post("http://16.16.43.64:8080/api/auth/signup", formData);
      setSuccessMessage("Signed up successfully!");
      setFormData({ name: "", username: "", email: "", password: "", passwordReminder: "" });
    } catch (err) {
      setError("User already exists!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password Reminder"
        name="passwordReminder"
        value={formData.passwordReminder}
        onChange={handleChange}
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>

      {error && <Box color="error.main" mt={1}>{error}</Box>}
      {successMessage && <Box color="primary.main" mt={1}>{successMessage}</Box>}
    </form>
  );
};

export default SignupForm;
