import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://16.16.43.64:8080/api/auth/signin", formData);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);
      navigate(`/user/${response.data.userId}`);
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
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
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleChange}
        margin="normal"
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Sign In
      </Button>

      {error && <Box color="error.main" mt={1}>{error}</Box>}
    </form>
  );
};

export default SigninForm;
