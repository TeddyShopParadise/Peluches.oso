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
  Paper
} from '@mui/material';

import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);
const PRODUCTOS_API_URL = apiUrl + "/producto";
const CATEGORIAS_API_URL = apiUrl + "/categorias";
const METODOSPAGO_API_URL = apiUrl + "/metodoPago";

const ProductoUsuario = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [openCarritoDialog, setOpenCarritoDialog] = useState(false);
  const [openDetalleDialog, setOpenDetalleDialog] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [preciosSeleccionados, setPreciosSeleccionados] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const productosPerPage = 12;
  const [refreshPopular, setRefreshPopular] = useState(false);

  const [pedido, setPedido] = useState({
    metodoPago: '',
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
  });

  const fetchProductos = async () => {
    try {
      const response = await fetch(PRODUCTOS_API_URL);
      const data = await response.json();
      const productosArray = Array.isArray(data) ? data : [];
      setProductos(productosArray);
      setFilteredProductos(productosArray);
    } catch (error) {
      console.error('Error fetching productos:', error);
      setSnackbarMessage('Error al obtener los productos');
      setOpenSnackbar(true);
    }
  };

  const fetchHistorialPrecios = async () => {
    try {
      const response = await fetch(`${apiUrl}/historialPrecio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los precios históricos');
      }

      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  
  const fetchMetodosPago = async () => {
    try {
      const response = await fetch(METODOSPAGO_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMetodosPago(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching Metodos de pago:', error);
      setSnackbarMessage('Error al obtener los Metodos de pago');
      setOpenSnackbar(true);
    }
  };


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
    fetchCategorias();
    fetchMetodosPago();
    fetchHistorialPrecios();
  }, []);

  const handleCategoriaFiltroChange = (event) => {
    const selectedCategoria = event.target.value;
    setCategoriaFiltro(selectedCategoria);
    filterProductos(selectedCategoria);
  };

  const filterProductos = (categoriaId) => {
    if (categoriaId === 'todos') {
      setFilteredProductos(productos);
    } else {
      const productosFiltrados = productos.filter((producto) =>
        producto.categorias && producto.categorias.some((cat) => cat._id === categoriaId)
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
      nombreComprador: '',
      numeroComprador: '',
      nombreAgendador: '',
      numeroAgendador: '',
      localidad: '',
      direccion: '',
      barrio: '',
      metodoPago: '',
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

  const incrementClickCount = async (productId) => {
    try {
      const response = await fetch(`${PRODUCTOS_API_URL}/${productId}/clics`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Error en el servidor');

      setRefreshPopular(prev => !prev);

    } catch (error) {
      console.error('Error al registrar clic:', error);
      setSnackbarMessage('Error al actualizar popularidad');
      setOpenSnackbar(true);
    }
  };

const handleSubmitPedido = async () => {
  const { precioFormateado, precioNumerico } = (() => {
    if (!productoSeleccionado?.historialPrecios?.length) {
      return { precioFormateado: "No disponible", precioNumerico: 0 };
    }

    const historialCompleto = productoSeleccionado.historialPrecios
      .map(precioId => historialPrecios.find(p => p._id === precioId))
      .filter(Boolean);

    const ultimoRegistro = historialCompleto.at(-1);
    
    return {
      precioFormateado: ultimoRegistro 
        ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(ultimoRegistro.precio)
        : "No disponible",
      precioNumerico: ultimoRegistro?.precio || 0
    };
  })();

  const metodoPagoNombre = metodosPago.find(
    (metodo) => metodo._id === pedido.metodoPago
  )?.nombreMetodoPago || 'No seleccionado';

  // Crear mensaje de WhatsApp
  const mensaje = [
    "¡Hola! Me gustaría realizar el siguiente pedido:\n",
    `📍 *Imagen del Producto:* ${productoSeleccionado?.imagen || 'No disponible'}`,
    `🔢 *ID del Producto:* ${productoSeleccionado?._id || 'No disponible'}`,
    `📦 *Producto:* ${productoSeleccionado?.estiloProducto || ''}`,
    `📏 *Tamaño:* ${productoSeleccionado?.tamañoProducto || ''}`,
    `💳 *Método de pago seleccionado:* ${metodoPagoNombre || 'No seleccionado'}`,
    `💰 *Total:* ${precioFormateado || 'No disponible'}`,
    "\n📋 *Datos del Pedido*",
    `👤 *Nombre del que paga:* ${pedido.nombreComprador || 'No proporcionado'}`,
    `📱 *Número del que paga:* ${pedido.numeroComprador || 'No proporcionado'}`,
    `👥 *Nombre del que recibe:* ${pedido.nombreAgendador || 'No proporcionado'}`,
    `📞 *Número del que recibe:* ${pedido.numeroAgendador || 'No proporcionado'}`,
    `🌍 *Localidad:* ${pedido.localidad || 'No proporcionado'}`,
    `🏠 *Dirección:* ${pedido.direccion || 'No proporcionado'}`,
    `🏘️ *Barrio:* ${pedido.barrio || 'No proporcionado'}`,
  ].join('\n');

  const mensajeCodificado = encodeURIComponent(mensaje);
  const numeroWhatsApp = "573217292955";
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
  window.open(urlWhatsApp, "_blank");

  try {
    // Buscar inventario relacionado
    let inventarioRelacionado = null;
    try {
      const inventarioResponse = await fetch(`${apiUrl}/inventario/por-producto/${productoSeleccionado._id}`);
      if (inventarioResponse.ok) {
        inventarioRelacionado = await inventarioResponse.json();
      }
    } catch (error) {
      console.warn('No se encontró inventario para el producto.');
    }

    // Preparar datos completos para el backend
    const datosCompletos = {
      pedidoData: {
        nombreComprador: pedido.nombreComprador || "Sin nombre",
        numeroComprador: pedido.numeroComprador || "0000000000",
        nombreAgendador: pedido.nombreAgendador || "Sin nombre",
        numeroAgendador: pedido.numeroAgendador || "0000000000",
        localidad: pedido.localidad || "Sin localidad",
        direccion: pedido.direccion || "Sin dirección",
        barrio: pedido.barrio || "Sin barrio"
      },
      detallesPedido: [{
        precio: precioNumerico,
        cantidad: 1,
        idProducto: productoSeleccionado._id,
        idInventario: inventarioRelacionado?._id || null
      }],
      metodoPago: pedido.metodoPago
    };
    
    // UNA SOLA LLAMADA AL BACKEND
    const response = await fetch(`${apiUrl}/factura/crear-pedido-completo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCompletos)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${JSON.stringify(responseData)}`);
    }

    
    await incrementClickCount(productoSeleccionado._id);
    setSnackbarMessage('Pedido realizado con éxito');
    
  } catch (error) {
    console.error('❌ Error completo:', error);
    setSnackbarMessage(error.message || 'Error al guardar el pedido');
  }

  setOpenSnackbar(true);
  handleCloseCarritoDialog();
};

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

return (
  <Box className="BoxInicial">      
    <Box 
      className="Box" 
      sx={{ 
        width: "90%", 
        maxWidth: "100%", 
        padding: { xs: "20px", md: "50px" }, 
        borderRadius: "30px", 
        margin: '0 auto',
        backgroundColor: '#fffafc',
        boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
        border: '2px solid #f8c8dc',
      }}
    >
      <Container>
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
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
            }}
          >
            ✨ PRODUCTOS ✨
          </Typography>
        </Box>

        <Paper
          elevation={2}
          sx={{
            padding: '20px',
            borderRadius: '20px',
            marginBottom: '30px',
            backgroundColor: '#fff0f5',
            border: '1px solid #f8c8dc',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FormControl 
            sx={{ 
              width: "280px", 
              '& .MuiOutlinedInput-root': {
                borderRadius: '15px',
                backgroundColor: 'white',
                '&.Mui-focused fieldset': {
                  borderColor: '#f48fb1',
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  color: '#f48fb1',
                },
              },
            }}
          >
            <InputLabel id="categoriaFiltro-label">🔍 Filtrar por Categoría</InputLabel>
            <Select
              labelId="categoriaFiltro-label"
              value={categoriaFiltro}
              onChange={handleCategoriaFiltroChange}
              label="🔍 Filtrar por Categoría"
            >
              <MenuItem value="todos">Todas las categorías</MenuItem>
              {categorias.map((categoria) => (
                <MenuItem key={categoria._id} value={categoria._id}>
                  {categoria.nombreCategoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Grid container spacing={3}>
          {currentProductos.map((producto) => (
            <Grid item xs={12} sm={6} md={3} key={producto._id}>
              <Card sx={{ 
                transition: 'all 0.3s ease', 
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 28px rgba(248, 200, 220, 0.4)',
                }, 
                borderRadius: '20px', 
                boxShadow: '0 8px 16px rgba(248, 200, 220, 0.2)',
                border: '1px solid #f8c8dc',
                backgroundColor: '#fff5f7',
              }}>
                <CardMedia
                  component="img"
                  height="330"
                  image={producto.imagen || 'default-image-url.jpg'}
                  alt={producto.estiloProducto}
                  sx={{ 
                    objectFit: 'cover', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '20px 20px 0 0',
                  }}
                />
                <CardContent sx={{ 
                  textAlign: 'left',
                  padding: '20px',
                }}>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      marginBottom: '15px',
                      lineHeight: 1.6,
                    }}
                  >
                    <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                      💰 Precio:
                    </Box>
                    {producto.historialPrecios && producto.historialPrecios.length > 0 ? (
                      producto.historialPrecios.map((precioId, index) => {
                        const precio = historialPrecios.find(p => p._id === precioId);
                        return precio ? (
                          <Box key={index} sx={{ fontSize: '16px', fontWeight: 'bold', color: '#ec7096' }}>
                            {new Intl.NumberFormat('es-CO', { 
                              style: 'currency', 
                              currency: 'COP' 
                            }).format(precio.precio)}
                          </Box>
                        ) : (
                          <Box key={index} sx={{ color: '#666' }}>Precio no disponible</Box>
                        );
                      })
                    ) : (
                      <Box sx={{ color: '#666' }}>No hay precios históricos disponibles.</Box>
                    )}
                    <Box sx={{ marginTop: '8px' }}>
                      <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                        📏 Tamaño:
                      </Box> {producto.tamañoProducto}
                    </Box>
                  </Typography>
                  
                  <Box mt={2} display="flex" justifyContent="space-between" gap={1}>
                    <Button 
                      variant="outlined" 
                      onClick={() => handleDetalleClick(producto)}
                      sx={{
                        borderRadius: '12px',
                        borderColor: '#f48fb1',
                        color: '#f48fb1',
                        '&:hover': {
                          borderColor: '#ec7096',
                          backgroundColor: 'rgba(244, 143, 177, 0.08)',
                          transform: 'translateY(-1px)',
                        },
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        padding: '8px 16px',
                      }}
                    >
                      Ver Detalles
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => handleCarritoClick(producto)}
                      sx={{
                        borderRadius: '12px',
                        backgroundColor: '#f48fb1',
                        '&:hover': {
                          backgroundColor: '#ec7096',
                          transform: 'translateY(-1px)',
                        },
                        textTransform: 'none',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(244, 143, 177, 0.3)',
                        fontSize: '12px',
                        padding: '8px 16px',
                      }}
                    >
                      🛒 Comprar
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredProductos.length / productosPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#b04e6f',
                borderRadius: '12px',
                '&.Mui-selected': {
                  backgroundColor: '#f48fb1',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#ec7096',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(244, 143, 177, 0.08)',
                },
              },
            }}
          />
        </Box>

        <Dialog 
          open={openDetalleDialog} 
          onClose={handleCloseDetalleDialog} 
          maxWidth="sm" 
          fullWidth={false}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              border: '2px solid #f8c8dc',
              backgroundColor: '#fffafc',
            }
          }}
        >
          <DialogContent sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: 3, 
            textAlign: "center", 
            position: "relative", 
            maxWidth: "400px", 
            margin: "auto" 
          }}>
            {productoSeleccionado && (
              <>
                <CardMedia
                  component="img"
                  width="auto"
                  height="290"
                  image={productoSeleccionado.imagen || 'default-image-url.jpg'}
                  alt={productoSeleccionado.estiloProducto}
                  sx={{
                    borderRadius: "15px",
                    width: "auto",
                    objectFit: "contain",
                    boxShadow: "0 8px 20px rgba(248, 200, 220, 0.4)",
                    marginBottom: 3,
                    border: '1px solid #f8c8dc',
                  }}
                />
               
                <Paper
                  sx={{
                    padding: '20px',
                    borderRadius: '15px',
                    backgroundColor: '#fff0f5',
                    border: '1px solid #f8c8dc',
                    width: '100%',
                  }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 2, 
                    alignItems: "flex-start" 
                  }}>
                    <Typography variant="body1" sx={{ 
                      textAlign: "left",
                      color: '#666',
                      lineHeight: 1.6,
                    }}>
                      <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                        📝 Descripción del Producto:
                      </Box> {productoSeleccionado.estiloProducto}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      textAlign: "left",
                      color: '#666',
                    }}>
                      <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                        📏 Tamaño:
                      </Box> {productoSeleccionado.tamañoProducto}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      textAlign: "left",
                      color: '#666',
                    }}>
                      <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                        ✅ Disponibilidad:
                      </Box> {productoSeleccionado.disponibilidadProducto}
                    </Typography>
                  </Box>
                </Paper>
              </>
            )}
            <Button 
              onClick={handleCloseDetalleDialog} 
              variant="contained" 
              sx={{ 
                mt: 3, 
                borderRadius: "15px", 
                px: 4, 
                py: 1.5, 
                backgroundColor: '#f48fb1',
                '&:hover': {
                  backgroundColor: '#ec7096',
                },
                boxShadow: "0 4px 12px rgba(244, 143, 177, 0.3)",
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Cerrar
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog 
          open={openCarritoDialog} 
          onClose={handleCloseCarritoDialog} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '20px',
              border: '2px solid #f8c8dc',
              backgroundColor: '#fffafc',
            }
          }}
        >
          <Box
            sx={{
              padding: '20px 30px 10px 30px',
              backgroundColor: '#fff0f5',
              borderBottom: '1px solid #f8c8dc',
            }}
          >
            <Typography 
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#b04e6f',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                textAlign: 'center',
              }}
            >
              🛒 Detalles del Pedido
            </Typography>
          </Box>
          
          <DialogContent sx={{ padding: '30px' }}>
            {productoSeleccionado && (
              <>
                <Paper
                  sx={{
                    padding: '20px',
                    borderRadius: '15px',
                    backgroundColor: '#fff0f5',
                    border: '1px solid #f8c8dc',
                    marginBottom: '25px',
                  }}
                >
                  <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                    <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                      🧸 Producto:
                    </Box> {productoSeleccionado.estiloProducto}
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                    <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                      📏 Tamaño:
                    </Box> {productoSeleccionado.tamañoProducto}
                  </Typography>
                  <Typography variant="body1" gutterBottom sx={{ color: '#666' }}>
                    <Box component="span" sx={{ color: '#b04e6f', fontWeight: 'bold' }}>
                      💰 Precio:
                    </Box>
                    {productoSeleccionado.historialPrecios && productoSeleccionado.historialPrecios.length > 0 ? (
                      productoSeleccionado.historialPrecios.map((precioId, index) => {
                        const precio = historialPrecios.find(p => p._id === precioId);
                        return precio ? (
                          <Box component="span" key={index} sx={{ fontWeight: 'bold', color: '#ec7096', marginLeft: '8px' }}>
                            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio.precio)}
                          </Box>
                        ) : (
                          <Box component="span" key={index} sx={{ color: '#666', marginLeft: '8px' }}>
                            Precio no disponible
                          </Box>
                        );
                      })
                    ) : (
                      <Box component="span" sx={{ color: '#666', marginLeft: '8px' }}>
                        No hay precios históricos disponibles.
                      </Box>
                    )}
                  </Typography>
                </Paper>

                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      color: '#b04e6f',
                      fontWeight: 'bold',
                      fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                      marginBottom: '15px',
                    }}
                  >
                    💳 Información de Pago
                  </Typography>
                  <FormControl 
                    fullWidth 
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  >
                    <InputLabel id="metodo-pago-label">Método de Pago</InputLabel>
                    <Select
                      labelId="metodo-pago-label"
                      name="metodoPago"
                      value={pedido.metodoPago}
                      label="Método de Pago"
                      onChange={handleInputChange}
                    >
                      {metodosPago.map((metodo) => (
                        <MenuItem key={metodo._id} value={metodo._id}>
                          {metodo.nombreMetodoPago}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Nombre de quién paga"
                    fullWidth
                    name="nombreComprador"
                    value={pedido.nombreComprador}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Número de quién paga"
                    fullWidth
                    name="numeroComprador"
                    value={pedido.numeroComprador}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      color: '#b04e6f',
                      fontWeight: 'bold',
                      fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                      marginBottom: '15px',
                    }}
                  >
                    👤 Información del Receptor
                  </Typography>
                  <TextField
                    label="Nombre del que recibe"
                    fullWidth
                    name="nombreAgendador"
                    value={pedido.nombreAgendador}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Número del que recibe"
                    fullWidth
                    name="numeroAgendador"
                    value={pedido.numeroAgendador}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      color: '#b04e6f',
                      fontWeight: 'bold',
                      fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                      marginBottom: '15px',
                    }}
                  >
                    🚚 Datos de Entrega
                  </Typography>
                  <TextField
                    label="Dirección"
                    fullWidth
                    name="direccion"
                    value={pedido.direccion}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Barrio"
                    fullWidth
                    name="barrio"
                    value={pedido.barrio}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                  <TextField
                    label="Localidad"
                    fullWidth
                    name="localidad"
                    value={pedido.localidad}
                    onChange={handleInputChange}
                    sx={{ 
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                          borderColor: '#f48fb1',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                          color: '#f48fb1',
                        },
                      },
                    }}
                  />
                </Box>
              </>
            )}
          </DialogContent>
          <Box
            sx={{
              padding: '20px 30px 30px 30px',
              backgroundColor: '#fff0f5',
              borderTop: '1px solid #f8c8dc',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button 
              onClick={handleCloseCarritoDialog} 
              variant="outlined" 
              sx={{ 
                borderRadius: '15px',
                borderColor: '#f48fb1',
                color: '#f48fb1',
                '&:hover': {
                  borderColor: '#ec7096',
                  backgroundColor: 'rgba(244, 143, 177, 0.08)',
                },
                textTransform: 'none',
                fontWeight: 'bold',
                padding: '10px 25px',
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmitPedido} 
              variant="contained" 
              sx={{
                borderRadius: '15px',
                backgroundColor: '#f48fb1',
                '&:hover': {
                  backgroundColor: '#ec7096',
                  transform: 'translateY(-1px)',
                },
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(244, 143, 177, 0.3)',
                padding: '10px 25px',
              }}
            >
              Enviar Pedido
            </Button>
          </Box>
        </Dialog>

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity={snackbarMessage.includes('Error') ? 'error' : 'success'} 
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              '&.MuiAlert-standardSuccess': {
                backgroundColor: '#f0f9ff',
                color: '#065f46',
                border: '1px solid #34d399',
              },
              '&.MuiAlert-standardError': {
                backgroundColor: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #f87171',
              },
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  </Box>
);
};

export default ProductoUsuario;
