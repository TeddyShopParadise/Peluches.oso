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
      console.log("Productos obtenidos:", data);
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
      console.log("Historial de precios cargado:", data);
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
    console.log('Producto seleccionado:', productoSeleccionado);
    console.log('Historial de precios:', historialPrecios);
    console.log('Metodos de pago:', metodosPago);
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
    
      // Obtener el nombre del método de pago
      const metodoPagoNombre = metodosPago.find(
        (metodo) => metodo._id === pedido.metodoPago
      )?.nombreMetodoPago || 'No seleccionado';
    
      // Crear mensaje de WhatsApp
      const mensaje = `¡Hola! Me gustaría realizar el siguiente pedido:  
    
      📌 *Imagen del Producto:*  
      ${productoSeleccionado?.imagen || 'No disponible'}  
      
      🆔 *ID del Producto:* ${productoSeleccionado?._id || 'No disponible'}  
      📦 *Producto:* ${productoSeleccionado?.estiloProducto || ''}  
      📏 *Tamaño:* ${productoSeleccionado?.tamañoProducto || ''}  
      💵 *Metodo de pago seleccionado:* ${metodoPagoNombre}
      💰 *Total:* ${precioFormateado}  
      
      🔹 *Datos del Pedido*  
      👤 *Nombre del Comprador:* ${pedido.nombreComprador}  
      📞 *Número del Comprador:* ${pedido.numeroComprador}  
      👤 *Nombre del Agendador:* ${pedido.nombreAgendador}  
      📞 *Número del Agendador:* ${pedido.numeroAgendador}  
      📍 *Localidad:* ${pedido.localidad}  
      🏠 *Dirección:* ${pedido.direccion}  
      🏘 *Barrio:* ${pedido.barrio}`;
    
      const mensajeCodificado = encodeURIComponent(mensaje.trim());
      const numeroWhatsApp = "573217292955";
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
      window.open(urlWhatsApp, "_blank");
    
      try {
        // Paso 1: Crear el pedido
        const pedidoCompleto = {
          nombreComprador: pedido.nombreComprador || "Sin nombre",
          numeroComprador: pedido.numeroComprador || "0000000000",
          nombreAgendador: pedido.nombreAgendador || "Sin nombre",
          numeroAgendador: pedido.numeroAgendador || "0000000000",
          localidad: pedido.localidad || "Sin localidad",
          direccion: pedido.direccion || "Sin dirección",
          barrio: pedido.barrio || "Sin barrio",
          cliente: "671976d2269e33c817066681",
          facturas: [],
          detallesPedido: [] // Inicializar como array vacío
        };
    
        console.log("Enviando pedido:", JSON.stringify(pedidoCompleto, null, 2));
    
        const response = await fetch(`${apiUrl}/pedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pedidoCompleto)
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${JSON.stringify(responseData)}`);
        }
    
        console.log('Pedido guardado:', responseData);
    
        // Paso 2: Crear el detalle del pedido
        const detallePedido = {
          precioDetallePedido: precioNumerico,
          cantidadDetallePedido: 1,
          idPedido: responseData._id,
          idProducto: productoSeleccionado._id
        };
        
        const detalleResponse = await fetch(`${apiUrl}/detallesPedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detallePedido)
        });
        const detalleData = await detalleResponse.json();
        if (!detalleResponse.ok) {
          throw new Error(`Error en detallePedido: ${JSON.stringify(detalleData)}`);
        }
        
        // Paso 3: Buscar inventario relacionado (antes de crear detalle de factura)
        let inventarioRelacionado = null;
        try {
          const inventarioResponse = await fetch(`${apiUrl}/inventario/por-producto/${productoSeleccionado._id}`);
          if (inventarioResponse.ok) {
            inventarioRelacionado = await inventarioResponse.json();
          } else {
            console.warn('No se encontró inventario para el producto.');
          }
        } catch (error) {
          console.error('Error buscando inventario relacionado:', error);
        }
        
        // Paso 4: Crear el detalle de factura
        const detalleFactura = {
          precioDetalleFactura: precioNumerico.toString(),
          cantidadDetalleFactura: 1,
          idProducto: productoSeleccionado._id,
          ...(inventarioRelacionado && inventarioRelacionado._id && { idInventario: inventarioRelacionado._id })
        };
        
        const detalleFacturaResponse = await fetch(`${apiUrl}/detallesFactura`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detalleFactura)
        });
        const detalleFacturaData = await detalleFacturaResponse.json();
        if (!detalleFacturaResponse.ok) {
          throw new Error(`Error en Detalle Factura: ${JSON.stringify(detalleFacturaData)}`);
        }
        
        // Paso 5: Crear la factura con el detalle directamente
        let facturaData;
try {
  const facturaExistenteResponse = await fetch(`${apiUrl}/factura/pedido/${responseData._id}`);
  if (facturaExistenteResponse.ok) {
    // Si ya existe una factura, usamos esa
    facturaData = await facturaExistenteResponse.json();
    console.log('Factura existente encontrada:', facturaData);
  } else {
    // Si no existe, creamos una nueva
    const factura = {
      fechaCreacionFactura: new Date().toISOString(),
      horaCreacionFactura: new Date().toLocaleTimeString('es-MX'),

      pedido: responseData._id,
      metodoPago: pedido.metodoPago,
      detallesFactura: [detalleFacturaData._id]
    };
    
    const facturaResponse = await fetch(`${apiUrl}/factura`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(factura)
    });
    facturaData = await facturaResponse.json();
    if (!facturaResponse.ok) {
      throw new Error(`Error en Factura: ${JSON.stringify(facturaData)}`);
    }
  }
} catch (error) {
  console.error('Error con la factura:', error);
  throw error;
}
        
        // Paso 6: Actualizar el pedido con el detalle y la factura
        const updatePedido = {
          nombreComprador: responseData.nombreComprador,
          numeroComprador: responseData.numeroComprador,
          nombreAgendador: responseData.nombreAgendador,
          numeroAgendador: responseData.numeroAgendador,
          localidad: responseData.localidad,
          direccion: responseData.direccion,
          barrio: responseData.barrio,
          detallesPedido: [detalleData._id],
          facturas: [facturaData._id],
          cliente: responseData.cliente
        };
        
        const updateResponsePedido = await fetch(`${apiUrl}/pedido/${responseData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePedido)
        });
        const updateResponseText = await updateResponsePedido.text();
        if (!updateResponsePedido.ok) {
          throw new Error(`Error actualizando pedido: ${updateResponseText}`);
        }
        
        console.log('Pedido actualizado con detalle y factura');
        setSnackbarMessage('Pedido realizado con éxito');
      } catch (error) {
        console.error('Error completo:', error);
        setSnackbarMessage(error.message || 'Error al guardar el pedido');
        setOpenSnackbar(true);
      }
    
      setOpenSnackbar(true);
      handleCloseCarritoDialog();
    };

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

  return (
    <Box className="BoxInicial">      
      <Box className="Box" 
        sx={{ 
          width: "90%", 
          maxWidth: "100%", 
          padding: { xs: "20px", md: "50px" }, 
          borderRadius: "30px", 
        }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            PRODUCTOS
          </Typography>
          <FormControl style={{ width: "260px", height:"40px" }} sx={{ marginBottom: 5 }}>
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
                <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' }, borderRadius: 3, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="330"
                    width="500"
                    image={producto.imagen || 'default-image-url.jpg'}
                    alt={producto.estiloProducto}
                    sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0', borderRadius: '12px 12px 0 0' }}
                  />
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Precio:</strong>
                      {producto.historialPrecios && producto.historialPrecios.length > 0 ? (
                        producto.historialPrecios.map((precioId, index) => {
                          const precio = historialPrecios.find(p => p._id === precioId);
                          return (
                            <div key={index}>
                              {precio ? (
                                new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio.precio)
                              ) : (
                                <span>Precio no disponible</span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div>No hay precios históricos disponibles.</div>
                      )}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                      <strong>Tamaño:</strong> {producto.tamañoProducto}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="space-between">
                      <Button variant="outlined" color="primary" onClick={() => handleDetalleClick(producto)}>
                        Ver Detalles
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => handleCarritoClick(producto)}>
                        Comprar
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
              color="primary"
            />
          </Box>

          <Dialog open={openDetalleDialog} onClose={handleCloseDetalleDialog} maxWidth="sm" fullWidth={false}>
            <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, textAlign: "center", position: "relative", maxWidth: "400px", margin: "auto" }}>
              {productoSeleccionado && (
                <>
                  <CardMedia
                    component="img"
                    width="auto"
                    height="290"
                    image={productoSeleccionado.imagen || 'default-image-url.jpg'}
                    alt={productoSeleccionado.estiloProducto}
                    sx={{
                      borderRadius: "10px",
                      width: "auto",
                      objectFit: "contain",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                      marginBottom: 2,
                    }}
                  />
                 
                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "90%", alignItems: "flex-start" }}>
           <Typography variant="body2" sx={{ textAlign: "left" }} gutterBottom><strong>Descripción:</strong> {productoSeleccionado.estiloProducto}</Typography>
           <Typography variant="body1"><strong>Tamaño:</strong> {productoSeleccionado.tamañoProducto}</Typography>
           <Typography variant="body1"><strong>Disponibilidad:</strong> {productoSeleccionado.disponibilidadProducto}</Typography>

                </Box>
              
                </>
              )}
              <Button onClick={handleCloseDetalleDialog} variant="contained" color="secondary" sx={{ mt: 2, borderRadius: "20px", px: 3, py: 1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>
                Cerrar
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={openCarritoDialog} onClose={handleCloseCarritoDialog} maxWidth="sm" fullWidth={false}>
            <DialogTitle>Detalles del pedido</DialogTitle>
            
            <DialogContent>
              {productoSeleccionado && (

                
                <>

                  
                  <Typography variant="body1" color="text.secondary">
                      <strong>Precio:</strong>
                      {productoSeleccionado.historialPrecios && productoSeleccionado.historialPrecios.length > 0 ? (
                        productoSeleccionado.historialPrecios.map((precioId, index) => {
                          const precio = historialPrecios.find(p => p._id === precioId);
                          return (
                            <div key={index}> 
                              {precio ? (
                                new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio.precio)
                              ) : (
                                <span>Precio no disponible</span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div>No hay precios históricos disponibles.</div>
                      )}
                  </Typography>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Número de quién paga"
                    fullWidth
                    name="numeroComprador"
                    value={pedido.numeroComprador}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Nombre del que recibe"
                    fullWidth
                    name="nombreAgendador"
                    value={pedido.nombreAgendador}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Número del que recibe"
                    fullWidth
                    name="numeroAgendador"
                    value={pedido.numeroAgendador}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                    <TextField
                    label="Dirección"
                    fullWidth
                    name="direccion"
                    value={pedido.direccion}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                   <TextField
                    label="Barrio"
                    fullWidth
                    name="barrio"
                    value={pedido.barrio}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Localidad"
                    fullWidth
                    name="localidad"
                    value={pedido.localidad}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmitPedido} variant="contained" color="secondary">Enviar Pedido</Button>
              <Button onClick={handleCloseCarritoDialog} variant="outlined">Cancelar</Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductoUsuario;
