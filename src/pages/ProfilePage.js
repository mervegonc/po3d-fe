import React from 'react';
import ProfileCard from '../components/ProfileCard';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
  const { state: userData } = useLocation(); // Login'den gelen kullanıcı verilerini al

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Arka plan rengi
      }}
    >
      <ProfileCard userData={userData} />
    </Box>
  );
}

export default ProfilePage;
