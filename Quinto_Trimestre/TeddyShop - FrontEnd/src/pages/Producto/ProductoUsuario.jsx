import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);
const API_URL = apiUrl + "/producto";
const CATEGORIAS_API_URL = apiUrl + "/categorias";

const ProductoUsuario = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [openCarritoDialog, setOpenCarritoDialog] = useState(false);
  const [openDetalleDialog, setOpenDetalleDialog] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const productosPerPage = 12;

  const [pedido, setPedido] = useState({
    tamañoOso: '',
    nombreComprador: '',
    apellidoComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    apellidoAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
  });

  // Obtener productos de la API
  const fetchProductos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const productosArray = Array.isArray(data) ? data : [];
      setProductos(productosArray);
      setFilteredProductos(productosArray); // Inicialmente mostramos todos los productos
    } catch (error) {
      console.error('Error fetching productos:', error);
      setSnackbarMessage('Error al obtener los productos');
      setOpenSnackbar(true);
    }
  };

  // Obtener categorías de la API
  const fetchCategorias = async () => {
    try {
      const response = await fetch(CATEGORIAS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategorias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categorias:', error);
      setSnackbarMessage('Error al obtener las categorías');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchCategorias(); // Obtener las categorías
  }, []);

  // Filtrar productos según el tamaño seleccionado
  const handleTamañoFiltroChange = (event) => {
    const selectedSize = event.target.value;
    setTamañoFiltro(selectedSize);

    filterProductos(selectedSize, categoriaFiltro);
  };

  // Filtrar productos según la categoría seleccionada
  const handleCategoriaFiltroChange = (event) => {
    const selectedCategoria = event.target.value;
    setCategoriaFiltro(selectedCategoria);
    filterProductos(selectedCategoria);
  };

  // Filtrar productos por tamaño y categoría
  const filterProductos = (categoriaId) => {
    if (categoriaId === 'todos') {
      setFilteredProductos(productos);
    } else {
      const productosFiltrados = productos.filter(producto =>
        producto.categorias && producto.categorias.some(cat => cat._id === categoriaId)
      );
      setFilteredProductos(productosFiltrados);
    }
    setCurrentPage(1);
  };

  // Obtener productos de la página actual
  const indexOfLastProduct = currentPage * productosPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleCarritoClick = (producto) => {
    setProductoSeleccionado(producto);
    setOpenCarritoDialog(true);
  };

  const handleCloseCarritoDialog = () => {
    setOpenCarritoDialog(false);
    setPedido({
      tamañoOso: '',
      nombreComprador: '',
      apellidoComprador: '',
      numeroComprador: '',
      nombreAgendador: '',
      apellidoAgendador: '',
      numeroAgendador: '',
      localidad: '',
      direccion: '',
      barrio: '',
      cliente: '',
    });
  };

  const handleDetalleClick = (producto) => {
    setProductoSeleccionado(producto);
    setOpenDetalleDialog(true);
  };

  const handleCloseDetalleDialog = () => {
    setOpenDetalleDialog(false);
    setProductoSeleccionado(null);
  };

  const handleInputChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmitPedido = () => {
    const mensaje = `
      ¡Hola! Me gustaría realizar el siguiente pedido:
      - ID del Producto: ${productoSeleccionado?._id || 'No disponible'}
      - Producto: ${productoSeleccionado?.estiloProducto || ''}
      - Tamaño: ${productoSeleccionado?.tamañoProducto || ''}
      - Material: ${productoSeleccionado?.materialProducto || ''}
      
      **Datos del Pedido**
      - Nombre del Comprador: ${pedido.nombreComprador}
      - Apellido del Comprador: ${pedido.apellidoComprador}
      - Número del Comprador: ${pedido.numeroComprador}
      - Nombre del Agendador: ${pedido.nombreAgendador}
      - Apellido del Agendador: ${pedido.apellidoAgendador}
      - Número del Agendador: ${pedido.numeroAgendador}
      - Localidad: ${pedido.localidad}
      - Dirección: ${pedido.direccion}
      - Barrio: ${pedido.barrio}
    `;

    const mensajeCodificado = encodeURIComponent(mensaje.trim());

    const numeroWhatsApp = "573217292955";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

    window.open(urlWhatsApp, "_blank");
    setSnackbarMessage('Pedido realizado exitosamente');
    setOpenSnackbar(true);
    handleCloseCarritoDialog();
  };

  // Manejar el cambio de página
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ height: "auto", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", margin: 0, padding: 0, py: 2 }}>
      <Box sx={{ width: "90%", maxWidth: "100%", padding: { xs: "20px", md: "50px" }, background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))", borderRadius: "30px", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)", backdropFilter: "blur(8px)", backgroundSize: "200% 200%", animation: "shimmer 10s infinite linear" }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            PRODUCTOS
          </Typography>
          {/* Filtro de categoría */}
          <FormControl style={{ width: "200px" }} sx={{ marginBottom: 5 }}>
            <InputLabel id="categoriaFiltro-label">Filtrar por Categoría</InputLabel>
            <Select
              labelId="categoriaFiltro-label"
              value={categoriaFiltro}
              onChange={handleCategoriaFiltroChange}
              label="Filtrar por Categoría"
            >
              <MenuItem value="todos">Todas las categorías</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria._id} value={categoria._id}>
                  {categoria.nombreCategoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={3}>
            {currentProductos.map((producto) => (
              <Grid item xs={12} sm={6} md={3} key={producto._id}>
                <Card
                  sx={{
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: 3,
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="386"
                    width="500"
                    image={producto.imagen || 'default-image-url.jpg'}
                    alt={producto.estiloProducto}
                    sx={{
                      objectFit: 'cover',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="h5" gutterBottom>
                      {producto.estiloProducto}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Material:</strong> {producto.materialProducto}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Tamaño:</strong> {producto.tamañoProducto}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Disponibilidad:</strong> {producto.disponibilidadProducto}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleDetalleClick(producto)}
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCarritoClick(producto)}
                      >
                        Comprar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>


          {/* Paginación */}
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredProductos.length / productosPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>

          {/* Diálogo para detalles del producto */}
          <Dialog open={openDetalleDialog} onClose={handleCloseDetalleDialog} maxWidth="sm" fullWidth>
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4, textAlign: "center", position: "relative" }}>
              {productoSeleccionado && (
                <>
                  <CardMedia
                    component="img"
                    height="700"
                    image={productoSeleccionado.imagen || 'default-image-url.jpg'}
                    alt={productoSeleccionado.estiloProducto}
                    sx={{
                      borderRadius: "90px",
                      width: "100%",
                      objectFit: "contain",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                      marginBottom: 3,
                    }}
                  />
                  <Typography variant="h4" gutterBottom>{productoSeleccionado.estiloProducto}</Typography>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    width: "95%",
                    alignItems: "flex-start",
                  }}>
                    <Typography variant="body1"><strong>Material:</strong> {productoSeleccionado.materialProducto}</Typography>
                    <Typography variant="body1"><strong>Tamaño:</strong> {productoSeleccionado.tamañoProducto}</Typography>
                    <Typography variant="body1"><strong>medida de Cabeza a Cola:</strong> {productoSeleccionado.cmCabezaColaProducto}</Typography>
                    <Typography variant="body1"><strong>medida de Cola a Pata:</strong> {productoSeleccionado.cmColaPataProducto}</Typography>
                    <Typography variant="body1"><strong>Disponibilidad:</strong> {productoSeleccionado.disponibilidadProducto}</Typography>
                  </Box>
                </>
              )}
              <Button onClick={handleCloseDetalleDialog} variant="contained" color="secondary" sx={{ mt: 3, borderRadius: "20px", px: 4, py: 1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>Cerrar</Button>
            </DialogContent>
          </Dialog>

          {/* Diálogo para llenar datos de pedido */}
          <Dialog open={openCarritoDialog} onClose={handleCloseCarritoDialog}>
            <DialogTitle>Datos del Pedido</DialogTitle>
            <DialogContent>
              <TextField
                name="nombreComprador"
                label="Nombre del Comprador"
                fullWidth
                margin="normal"
                value={pedido.nombreComprador}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="apellidoComprador"
                label="Apellido del Comprador"
                fullWidth
                margin="normal"
                value={pedido.apellidoComprador}
                onChange={handleInputChange}
              />
              <TextField
                name="numeroComprador"
                label="Número del Comprador"
                fullWidth
                margin="normal"
                value={pedido.numeroComprador}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="nombreAgendador"
                label="Nombre del Agendador"
                fullWidth
                margin="normal"
                value={pedido.nombreAgendador}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="apellidoAgendador"
                label="Apellido del Agendador"
                fullWidth
                margin="normal"
                value={pedido.apellidoAgendador}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="numeroAgendador"
                label="Número del Agendador"
                fullWidth
                margin="normal"
                value={pedido.numeroAgendador}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="localidad"
                label="Localidad"
                fullWidth
                margin="normal"
                value={pedido.localidad}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                margin="normal"
                value={pedido.direccion}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="barrio"
                label="Barrio"
                fullWidth
                margin="normal"
                value={pedido.barrio}
                onChange={handleInputChange}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCarritoDialog} color="secondary">
                Cancelar
              </Button>
              <Button onClick={handleSubmitPedido} color="primary">
                Confirmar Pedido
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductoUsuario;
