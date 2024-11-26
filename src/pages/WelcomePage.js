import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundImage: 'url(/path/to/background.jpg)', // Eğer arka plan görseli kullanmak isterseniz
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Pot3D - Çömlek Satış Platformu
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: '600px', mx: 'auto' }}>
          Kendi 3D çömlek modelinizi seçin, kişiselleştirin ve kolayca sipariş edin!
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Giriş Yap
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSignup}>
          Kayıt Ol
        </Button>
      </Box>
    </Container>
  );
}

export default WelcomePage;
