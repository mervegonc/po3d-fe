import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

function ProfileCard({ userData }) {
  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
      <CardMedia
        component="img"
        height="200"
        image="https://via.placeholder.com/400x200" // Placeholder resim, kullanıcı profil resmi eklenebilir
        alt="Profile picture"
      />
      <CardContent>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h5" component="div">
            {userData?.username || "Username"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData?.email || "user@example.com"}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Welcome to your profile! Here you can manage your account settings and preferences.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => {
            alert('Edit Profile clicked!');
          }}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
