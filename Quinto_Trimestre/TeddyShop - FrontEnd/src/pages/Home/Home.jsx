import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button, IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import logoTeddyShop from "../../assets/img/LogoTeddyShop.jpg";
import FaqSection from "../../assets/ts/FaqSection";
import "./Home.css";
import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [errorPopular, setErrorPopular] = useState(null);
  const [refreshPopular, setRefreshPopular] = useState(false);

  const carouselImages = [
    {
      id: "Sukuna",
      url: "https://i.imgur.com/Je6A2XM.jpeg"
    },
    {
      id: "Toji",
      url: "https://i.imgur.com/o2l4WPS.jpeg"
    },
    {
      id: "Yuta",
      url: "https://i.imgur.com/PexTLvB.jpeg"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoadingPopular(true);
        const response = await fetch(`${apiUrl}/producto/mas-populares`);
        
        if (!response.ok) throw new Error('Error en la respuesta');
        
        const data = await response.json();
        setPopularProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setErrorPopular(error.message);
        setPopularProducts([]);
      } finally {
        setLoadingPopular(false);
      }
    };
    
    fetchPopularProducts();
  }, [refreshPopular]);
  

return (
  <Container disableGutters sx={{ maxWidth: "100vw", padding: 0, margin: 0 }}>
    <div className="background-image"></div>

    <Box className="BoxInicial">
      <Box
        className="Box"
        sx={{
          width: '90%',
          maxWidth: '1200px',
          p: { xs: 2, md: 3 },
          borderRadius: '30px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fffafc',
          border: '2px solid #f8c8dc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
        }}
      >
        <div
          className="carousel-container"
          style={{
            position: 'relative',
            height: window.innerWidth < 600 ? '300px' : window.innerWidth < 960 ? '400px' : '500px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #f8c8dc',
          }}
        >
          <div className="carousel-track" style={{
            display: "flex",
            transition: "transform 0.5s ease",
            height: "100%",
            transform: `translateX(-${currentIndex * 100}%)`
          }}>
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                className="carousel-slide"
                style={{
                  minWidth: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(248, 200, 220, 0.05)",
                  padding: "20px",
                  boxSizing: "border-box"
                }}
              >
                <img 
                  src={image.url}
                  alt={image.id}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "15px",
                    boxShadow: '0 4px 12px rgba(248, 200, 220, 0.2)',
                  }}
                />
              </div>
            ))}
          </div>
          
          <IconButton 
            onClick={prevSlide}
            sx={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 250, 252, 0.9)",
              color: '#f48fb1',
              borderRadius: '12px',
              border: '1px solid #f8c8dc',
              "&:hover": { 
                backgroundColor: "rgba(244, 143, 177, 0.1)",
                borderColor: '#f48fb1',
              },
              zIndex: 2,
              boxShadow: '0 4px 8px rgba(248, 200, 220, 0.3)',
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          
          <IconButton 
            onClick={nextSlide}
            sx={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 250, 252, 0.9)",
              color: '#f48fb1',
              borderRadius: '12px',
              border: '1px solid #f8c8dc',
              "&:hover": { 
                backgroundColor: "rgba(244, 143, 177, 0.1)",
                borderColor: '#f48fb1',
              },
              zIndex: 2,
              boxShadow: '0 4px 8px rgba(248, 200, 220, 0.3)',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            zIndex: 2
          }}>
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "2px solid #f8c8dc",
                  background: index === currentIndex ? "#f48fb1" : "rgba(255, 250, 252, 0.8)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: '0 2px 4px rgba(248, 200, 220, 0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </Box>
    </Box>

    <Box className="BoxInicial">
      <Box
        className="Box"
        sx={{
          width: '98%',
          maxWidth: '600px',
          p: { xs: 3, md: 5 },
          borderRadius: '30px',
          backgroundColor: '#fff5f7',
          border: '2px solid #f8c8dc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '5px',
            background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)',
            borderRadius: '30px 30px 0 0',
          },
        }}
      >
        <img
          src={logoTeddyShop}
          alt="Peluches.oso Logo"
          loading="lazy"
          style={{ 
            width: '180px', 
            height: '180px', 
            marginBottom: '16px',
            borderRadius: '50%',
            border: '3px solid #f8c8dc',
            boxShadow: '0 4px 12px rgba(248, 200, 220, 0.3)',
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#b04e6f',
            fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          PELUCHES.OSO
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            fontSize: { xs: '1rem', md: '1.2rem' }, 
            color: '#b04e6f',
            mb: 3,
            fontWeight: '500',
          }}
        >
          ¡Bienvenidos a Peluches.oso! Encuentra el compañero de peluche perfecto para todas las edades.
        </Typography>
        <Box 
          component="ul" 
          sx={{ 
            listStyle: 'none', 
            p: 0, 
            mt: 2, 
            textAlign: 'left',
            maxWidth: '400px',
            margin: '0 auto',
            backgroundColor: '#fff0f5',
            borderRadius: '15px',
            border: '1px solid #f8c8dc',
          }}
        >
          {['Suaves y abrazables', 'Variedad de tamaños y estilos', 'Materiales de alta calidad', 'Amigos para toda la vida'].map(item => (
            <Typography 
              component="li" 
              key={item} 
              sx={{ 
                mb: 1, 
                color: '#b04e6f',
                display: 'flex',
                alignItems: 'center',
                '&::before': {
                  content: '"✨"',
                  marginRight: '8px',
                  fontSize: '1.2em',
                }
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            textTransform: 'none',
            backgroundColor: '#f48fb1',
            '&:hover': { backgroundColor: '#ec7096' },
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            px: 4,
            py: 1.5,
          }}
          href="/catalogos-usuario"
        >
          Ver Catálogo
        </Button>
      </Box>
    </Box>

    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: "90%",
          maxWidth: "1200px",
          padding: { xs: "20px", md: "50px" },
          borderRadius: "30px",
          backgroundColor: '#fffafc',
          border: '2px solid #f8c8dc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '25%',
              width: '50%',
              height: '4px',
              background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
              borderRadius: '10px',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#b04e6f",
              fontSize: { xs: "2rem", md: "3rem" },
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              fontWeight: 'bold',
            }}
          >
            LOS MÁS POPULARES
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {Array.isArray(popularProducts) && popularProducts.slice(0, 4).map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#fff5f7',
                  border: '1px solid #f8c8dc',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 28px rgba(248, 200, 220, 0.4)',
                  }
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={product.imagen}
                    alt={product.estiloProducto}
                    style={{ 
                      width: '100%',
                      height: "250px", 
                      objectFit: "cover"
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#f48fb1',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}>
                    Popular
                  </div>
                </div>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "#b04e6f",
                      fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                    }}
                  >
                    {product.estiloProducto}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#b04e6f',
                      mb: 2,
                      opacity: 0.8,
                    }}
                  >
                    Tamaño: {product.tamañoProducto}
                  </Typography>

                  <Button
                    variant="contained"
                    href={`/productos-usuario`}
                    sx={{ 
                      mt: 2, 
                      width: '100%',
                      backgroundColor: '#f48fb1',
                      '&:hover': { backgroundColor: '#ec7096' },
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Ver Todos los productos
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>

    {/* Sección de preguntas frecuentes */}
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: "90%",
          maxWidth: "1200px",
          padding: { xs: "20px", md: "50px" },
          borderRadius: "30px",
          backgroundColor: '#fff0f5',
          border: '2px solid #f8c8dc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
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
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '25%',
              width: '50%',
              height: '4px',
              background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
              borderRadius: '10px',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#b04e6f",
              fontSize: { xs: "2rem", md: "3rem" },
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              fontWeight: 'bold',
            }}
          >
            PREGUNTAS FRECUENTES
          </Typography>
        </Box>
        <Paper
          elevation={2}
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#fffafc',
            border: '1px solid #f8c8dc',
          }}
        >
          <div className="accordion-container">
            <FaqSection />
          </div>
        </Paper>
      </Box>
    </Box>

    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: "98%",
          maxWidth: "800px",
          maxHeight: "1000px",
          padding: { xs: "20px", md: "50px" },
          borderRadius: "30px",
          backgroundColor: '#fff5f7',
          border: '2px solid #f8c8dc',
          boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '30px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '25%',
              width: '50%',
              height: '4px',
              background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
              borderRadius: '10px',
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#b04e6f",
              fontSize: { xs: "2rem", md: "3rem" },
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              fontWeight: 'bold',
            }}
          >
            NOS UBICAMOS EN
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid #f8c8dc',
          }}
        >
          <iframe
            title="Ubicación Peluches.oso"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5624.3892489766695!2d-74.19486199590521!3d4.586165152583506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMzUnMjYuMSJOIDc0wrAxMSczNy4zIlc!5e0!3m2!1ses-419!2sco!4v1719348345914!5m2!1ses-419!2sco"
            style={{
              width: "100%",
              height: "300px",
              border: "0",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Paper>
      </Box>
    </Box>
  </Container>
);}

export default Home;