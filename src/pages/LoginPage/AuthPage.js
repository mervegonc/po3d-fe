import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" mb={2}>
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>

        {isSignup ? <SignupForm /> : <SigninForm />}

        <Typography align="center" sx={{ mt: 2 }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button color="primary" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Sign In" : "Sign Up for free"}
          </Button>
        </Typography>

        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => navigate("/forgotpassword")}>
          Change Password
        </Button>
      </Paper>
    </Box>
  );
};

export default AuthPage;
