import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Box, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import logoTeddyShop from "../../assets/img/LogoTeddyShop.jpg";
import FaqSection from "../../assets/ts/FaqSection";
import "./Home.css";

const Home = () => {
  // Estado para el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Función para ir a la siguiente imagen
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir a la imagen anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  //PRODUCTOS MAS VENDIDOS
  const bestSellers = [
    {
      id: 1,
      name: "Osito Clásico",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 79900,
      originalPrice: 99900,
      discount: "20% OFF",
    },
    {
      id: 2,
      name: "Panda Gigante",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 149900,
      originalPrice: 189900,
      discount: "25% OFF",
    },
    {
      id: 3,
      name: "Conejo Rosa",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 69900,
      originalPrice: 89900,
      discount: "15% OFF",
    },
    {
      id: 4,
      name: "León Dormilón",
      image: "https://images.unsplash.com/photo-1556012018-50c5c0da73bf?w=800",
      price: 99900,
      originalPrice: 129900,
      discount: "30% OFF",
    },
  ];

  return (
    <Container disableGutters sx={{ maxWidth: "100vw", padding: 0, margin: 0 }}>
      <div className="background-image"></div>

      {/* Sección de Carrusel */}
      <Box className="BoxInicial">
        <Box className="Box"
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "10px", sm: "20px", md: "30px" },
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="carousel-container" style={{
            position: "relative",
            height: { xs: "300px", sm: "400px", md: "500px" },
            borderRadius: "20px",
            overflow: "hidden"
          }}>
            {/* Imágenes del carrusel */}
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
                    background: "rgba(0,0,0,0.03)",
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
                      borderRadius: "10px"
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Botones de navegación */}
            <IconButton 
              onClick={prevSlide}
              sx={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.3)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
                zIndex: 2
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            
            <IconButton 
              onClick={nextSlide}
              sx={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.3)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.5)" },
                zIndex: 2
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
            
            {/* Indicadores */}
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
                    border: "none",
                    background: index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>
          </div>
        </Box>
      </Box>


      {/* Sección de bienvenida */}
      <Box className="BoxInicial">
      <Box className="Box"
          sx={{
            width: "98%",
            maxWidth: "600px",
            padding: { xs: "20px", md: "50px" },
            borderRadius: "30px",
            textAlign: "center",
          }}
      >
          <img
            src={logoTeddyShop}
            alt="Peluches.oso Logo"
            style={{
              width: "200px",
              height: "200px",
              marginBottom: "20px",
              maxWidth: "80%", // Ajuste para dispositivos móviles
            }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#2f2f2f" }}
          >
            PELUCHES.OSO
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "black" }}
          >
            ¡Bienvenidos a Peluches.oso! Encuentra el compañero de peluche
            perfecto para todas las edades.
          </Typography>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              color: "black",
              justifyContent: "space-evenly",
              padding: 0,
              listStyle: "none",
              marginTop: "20px",
            }}
          >
            <li>Suaves y abrazables</li>
            <li>Variedad de tamaños, colores y estilos</li>
            <li>Materiales de alta calidad y seguros para niños</li>
            <li>Más que solo juguetes, son amigos para toda la vida</li>
          </ul>
          <Typography variant="body1" sx={{ color: "black" }}>
            ¡Que esperas para ordenar tu peluche! ¡Te esperamos en Peluches.oso!
          </Typography>
        </Box>
      </Box>


      {/* Sección de Catalogos */}
      <Box className="BoxInicial">
      <Box className="Box"
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "20px", md: "50px" },
            borderRadius: "30px",
          }}
      >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            CATÁLOGOS
          </Typography>
          <section className="container">
          <div className="card-grid">
            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://imgur.com/i1VnFF8.jpeg)',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">Importados</p>
              </div>
            </a>

            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://imgur.com/ucTEu2r.jpeg',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">General</p>
              </div>
            </a>

            <a className="card">
              <div
                className="backgroundCat"
                style={{
                  backgroundImage: 'url(https://i.imgur.com/nTWfEGu.jpeg)',
                }}
              ></div>
              <div className="contentCat">
                <p className="category"></p>
                <p className="category">Fechas Especiales</p>
              </div>
            </a>
            </div>
          </section>
        </Box>  
      </Box>


      {/* Sección de los más vendidos */}
      <Box className="BoxInicial">
      <Box className="Box"
          sx={{
            width: "90%",
            maxWidth: "1200px",
            padding: { xs: "20px", md: "50px" },
            borderRadius: "30px",
          }}
      >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            LOS MÁS VENDIDOS
          </Typography>
          
          <Grid container spacing={4}>
            {bestSellers.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <div className="product-card">
                  <div style={{ position: "relative" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <span className="product-badge">{product.discount}</span>
                  </div>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "#2f2f2f",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <div className="price-tag">
                      <span className="original-price">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                      ${product.price.toLocaleString()}
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                      sx={{ mt: 2 }}
                    >
                      Agregar al carrito
                    </Button>
                  </Box>
                </div>
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
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            PREGUNTAS FRECUENTES
          </Typography>
          <div className="accordion-container">
            <FaqSection />
          </div>
        </Box>
      </Box>



      {/* Sección de ubicación */}
      <Box className="BoxInicial">
        <Box className="Box"
          sx={{
            width: "98%",
            maxWidth: "800px",
            maxHeight: "1000px",
            padding: { xs: "20px", md: "50px" },
            borderRadius: "30px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#2f2f2f",
              fontSize: { xs: "2rem", md: "3rem" },
              marginBottom: "20px",
            }}
          >
            NOS UBICAMOS EN
          </Typography>
          <iframe
            title="Ubicación Peluches.oso"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d5624.3892489766695!2d-74.19486199590521!3d4.586165152583506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMzUnMjYuMSJOIDc0wrAxMSczNy4zIlc!5e0!3m2!1ses-419!2sco!4v1719348345914!5m2!1ses-419!2sco"
            style={{
              width: "100%",
              height: "300px",
              border: "0",
              marginBottom: "20px",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
