import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);


export default function CatalogoUsuario() {
  const [catalogos, setCatalogos] = useState([]);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    listarCatalogos();
  }, []);

  const listarCatalogos = async () => {
    const response = await fetch(`${apiUrl}/catalogos/activos`);
    const data = await response.json();
    setCatalogos(data);
  };

  const handleDetalles = (catalogo) => {
    setSelectedCatalogo(catalogo);
  };


  const filteredCatalogos = catalogos.filter((catalogo) =>
    catalogo.nombreCatalogo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: '90%',
          maxWidth: '100%',
          padding: { xs: '20px', md: '50px' },
          borderRadius: '30px',
        }}
      >
    <Container maxWidth="lg" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Catálogo de Peluches
      </Typography>
      <Grid container spacing={4}>
        {filteredCatalogos.map((catalogo) => (
          <Grid item key={catalogo._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => handleDetalles(catalogo)}
            >
              <CardMedia
                component="img"
                alt={catalogo.nombreCatalogo}
                height="450"
                image={catalogo.imagen || 'default_image_url.jpg'}
              />
              <CardContent>
                <Typography variant="h5" textAlign="center" component="div">
                  {catalogo.nombreCatalogo}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  <strong>Descripción: </strong>{catalogo.descripcionCatalogo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Estilo: </strong> {catalogo.estiloCatalogo}
                </Typography>
                <br />
                <Typography variant="body2" textAlign="center" color="text.secondary">
                  <strong>Disponibilidad:</strong> {catalogo.disponibilidadCatalogo ? 'Disponible' : 'No Disponible'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
    </Box>
  );
}
