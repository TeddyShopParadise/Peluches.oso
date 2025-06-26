import React from "react";
import { Container, Typography, Box, Grid, IconButton } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FaTiktok } from "react-icons/fa6";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Box
        sx={{
          background: "#7434B0FF",
          color: "white",
          padding: { xs: "30px 20px", sm: "50px 40px" },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>

            {/* Redes Sociales */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                Síguenos en Redes Sociales
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton href="https://www.instagram.com/peluches.oso/" target="_blank" sx={{ color: "white" }}>
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://www.facebook.com/peluches.osooficial?mibextid=ZbWKwL" target="_blank" sx={{ color: "white" }}>
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton href="https://www.tiktok.com/@peluches.oso" target="_blank" sx={{ color: "white" }}>
                  <FaTiktok className="tiktok" fontSize="large" />
                </IconButton>
              </Box>
            </Grid>

            {/* Contáctanos */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                Contáctanos
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                <PhoneIcon />
                <Typography variant="body1"><a href="tel:+573222456505" style={{ color: "white" }}>3103221166</a></Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 1 }}>
                <PhoneIcon />
                <Typography variant="body1"><a href="tel:+573058780398" style={{ color: "white" }}>3058780398</a></Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon />
                <Typography variant="body1">Bogotá, Colombia</Typography>
              </Box>
            </Grid>

            {/* Enlaces rápidos */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" sx={{ marginBottom: "15px" }}>
                Enlaces rápidos
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
                <li><a href="/" style={{ color: "white", textDecoration: "none" }}>Inicio</a></li>
                <li><a href="/productos-usuario" style={{ color: "white", textDecoration: "none" }}>Productos</a></li>
                <li><a href="/catalogos-usuario" style={{ color: "white", textDecoration: "none" }}>Catálogos</a></li>
              </Box>
            </Grid>

            {/* Copyright */}
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 3 }}>
              <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "#D3D3D3" }}>
                © {currentYear} TeddyShop. Todos los derechos reservados.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
