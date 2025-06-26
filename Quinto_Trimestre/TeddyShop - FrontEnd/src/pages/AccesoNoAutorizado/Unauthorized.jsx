import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Lock, Home, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box className="BoxInicial">
      <Box
        className="Box"
        sx={{
          width: '90%',
          maxWidth: '700px',
          padding: '40px',
          borderRadius: '30px',
          margin: '0 auto',
          backgroundColor: '#fffafc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
          border: '2px solid #f8c8dc',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)',
          },
        }}
      >
        <Container>
          <Box
            sx={{
              marginBottom: '30px',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fff0f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                border: '3px solid #f8c8dc',
                boxShadow: '0 8px 20px rgba(248, 200, 220, 0.4)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, rgba(244, 143, 177, 0.1) 0%, rgba(248, 200, 220, 0.1) 100%)',
                  top: '0',
                  left: '0',
                },
              }}
            >
              <Lock
                sx={{
                  fontSize: '60px',
                  color: '#b04e6f',
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              marginBottom: '20px',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '30%',
                width: '40%',
                height: '3px',
                background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
                borderRadius: '10px',
              },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                color: '#b04e6f',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                fontSize: { xs: '3rem', sm: '4rem' },
                textShadow: '2px 2px 4px rgba(176, 78, 111, 0.1)',
              }}
            >
              403
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              marginBottom: '15px',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
            }}
          >
            🚫 Acceso Denegado
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#8e4a66',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              marginBottom: '40px',
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              lineHeight: 1.6,
              maxWidth: '500px',
              margin: '0 auto 40px auto',
            }}
          >
            ¡Ups! Parece que no tienes los permisos necesarios para acceder a esta sección de peluches. 🧸
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={handleGoHome}
              startIcon={<Home />}
              sx={{
                borderRadius: '20px',
                backgroundColor: '#f48fb1',
                '&:hover': {
                  backgroundColor: '#ec7096',
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                padding: '12px 30px',
                boxShadow: '0 6px 16px rgba(244, 143, 177, 0.4)',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                transition: 'all 0.3s ease',
                minWidth: '180px',
              }}
            >
              🏠 Ir al Inicio
            </Button>

            <Button
              variant="outlined"
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: '20px',
                borderColor: '#f48fb1',
                borderWidth: '2px',
                color: '#f48fb1',
                '&:hover': {
                  borderColor: '#ec7096',
                  backgroundColor: 'rgba(244, 143, 177, 0.08)',
                  transform: 'translateY(-2px)',
                },
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                padding: '10px 30px',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                transition: 'all 0.3s ease',
                minWidth: '180px',
              }}
            >
              ⬅️ Regresar
            </Button>
          </Box>

          <Box
            sx={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#fff5f7',
              borderRadius: '15px',
              border: '1px solid #f8c8dc',
              maxWidth: '400px',
              margin: '30px auto 0 auto',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#8e4a66',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}
            >
              💡 <strong>Consejo:</strong> Si crees que deberías tener acceso, contacta al administrador para verificar tus permisos.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Unauthorized;