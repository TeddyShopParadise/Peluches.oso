import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  Pagination,
  DialogTitle,
  TextField,
  DialogActions 
} from '@mui/material';
import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);
const METODOSPAGO_API_URL = apiUrl + "/metodoPago";

export default function CatalogoUsuario() {
  const [catalogos, setCatalogos] = useState([]);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);
  const [productosCatalogo, setProductosCatalogo] = useState([]);
  const [categoriasCatalogo, setCategoriasCatalogo] = useState([]);
  const [showProductos, setShowProductos] = useState(false);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 12;
  const [openDetalleDialog, setOpenDetalleDialog] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [openCarritoDialog, setOpenCarritoDialog] = useState(false);
  const [metodosPago, setMetodosPago] = useState([]);
  
  const [pedido, setPedido] = useState({
    metodoPago: '',
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
  });

  useEffect(() => {
    fetchHistorialPrecios();
  }, []);

 


  useEffect(() => {
    listarCatalogos();
  }, []);

  useEffect(() => {
    if (productosCatalogo.length > 0) {
      filterProductos(categoriaFiltro);
      fetchMetodosPago();
    }
  }, [categoriaFiltro, productosCatalogo]);

  const listarCatalogos = async () => {
    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`);
      const data = await response.json();
      setCatalogos(data);
    } catch (error) {
      console.error('Error fetching catalogos:', error);
      setSnackbarMessage('Error al obtener los catálogos');
      setOpenSnackbar(true);
    }
  };


    //Obtener los metodos de pago
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


  const fetchHistorialPrecios = async () => {
    try {
      const response = await fetch(`${apiUrl}/historialPrecio`);
      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error('Error al obtener el historial de precios:', error);
      setSnackbarMessage('Error al obtener los precios');
      setOpenSnackbar(true);
    }
  };

  const handleCarritoClick = (producto) => {
    setProductoSeleccionado(producto);
    setOpenCarritoDialog(true);
  };

  const handleCloseCarritoDialog = () => {
    setOpenCarritoDialog(false);
    setPedido({
      metodoPago: '',
      tamañoOso: '',
      nombreComprador: '',
      numeroComprador: '',
      nombreAgendador: '',
      numeroAgendador: '',
      localidad: '',
      direccion: '',
      barrio: '',
      cliente: '',
    });
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
  
      console.log("Enviando detallePedido:", detallePedido);
  
      const detalleResponse = await fetch(`${apiUrl}/detallesPedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detallePedido)
      });
  
      const detalleData = await detalleResponse.json();
  
      if (!detalleResponse.ok) {
        throw new Error(`Error en detallePedido: ${JSON.stringify(detalleData)}`);
      }
  
      console.log('DetallePedido guardado:', detalleData);
  
      // Paso 3: Crear la factura
      const factura = {
        fechaCreacionFactura: new Date().toISOString(),
        horaCreacionFactura: new Date().toLocaleTimeString('es-MX'),
        pedido: responseData._id,
        detallesFactura: [],
        metodoPago: pedido.metodoPago,
      };
  
      console.log("Enviando Factura:", factura);
      
      const facturaResponse = await fetch(`${apiUrl}/factura`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(factura)
      });
  
      const facturaData = await facturaResponse.json();
      
      if (!facturaResponse.ok) {
        throw new Error(`Error en Factura: ${JSON.stringify(facturaData)}`);
      }
  
      console.log('Factura guardada:', facturaData);
  
      // Paso 4: Crear el detalle de la factura
      const detalleFactura = {
        precioDetalleFactura: precioNumerico.toString(),
        cantidadDetalleFactura: 1,
        idProducto: productoSeleccionado._id,
        idFactura: facturaData._id 
      };
  
      console.log("Enviando Detalle Factura:", detalleFactura);
      
      const detalleFacturaResponse = await fetch(`${apiUrl}/detallesFactura`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalleFactura)
      });
  
      const detalleFacturaData = await detalleFacturaResponse.json();
      
      if (!detalleFacturaResponse.ok) {
        throw new Error(`Error en Detalle Factura: ${JSON.stringify(detalleFacturaData)}`);
      }
  
      console.log('Detalle Factura guardada:', detalleFacturaData);
  
      // Paso 5: Actualizar la factura con el detalle
      const updateFactura = {
        fechaCreacionFactura: facturaData.fechaCreacionFactura,
        horaCreacionFactura: facturaData.horaCreacionFactura,
        pedido: facturaData.pedido,
        metodoPago: facturaData.metodoPago,
        detallesFactura: [detalleFacturaData._id]
      };
      
      const updateResponse = await fetch(`${apiUrl}/factura/${facturaData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFactura)
      });
  
      if (!updateResponse.ok) {
        throw new Error(`Error actualizando factura: ${await updateResponse.text()}`);
      }
  
      console.log('Factura actualizada con detalle');
  
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

console.log('Intentando actualizar el pedido con:', updatePedido);

const updateResponsePedido = await fetch(`${apiUrl}/pedido/${responseData._id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(updatePedido)
});

const updateResponseText = await updateResponsePedido.text();

if (!updateResponsePedido.ok) {
console.error('Error al actualizar pedido - status:', updateResponsePedido.status);
console.error('Respuesta del servidor:', updateResponseText);
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

  


  const handleDetalles = async (catalogo) => {
    setSelectedCatalogo(catalogo);
    setCategoriaFiltro('todos');
    
    try {
      const productosResponse = await fetch(`${apiUrl}/producto/catalogo/${catalogo._id}`);
      const productosData = await productosResponse.json();
      setProductosCatalogo(productosData);
      
      const categoriasUnicas = [];
      productosData.forEach(producto => {
        if (producto.categorias) {
          producto.categorias.forEach(categoria => {
            if (!categoriasUnicas.some(c => c._id === categoria._id)) {
              categoriasUnicas.push(categoria);
            }
          });
        }
      });
      setCategoriasCatalogo(categoriasUnicas);
      
      setShowProductos(true);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al obtener productos y categorías:', error);
      setSnackbarMessage('Error al cargar los productos del catálogo');
      setOpenSnackbar(true);
    }
  };

  const handleBackToCatalogos = () => {
    setShowProductos(false);
    setSelectedCatalogo(null);
  };

  const handleCategoriaFiltroChange = (event) => {
    setCategoriaFiltro(event.target.value);
  };

  const filterProductos = (categoriaId) => {
    if (categoriaId === 'todos') {
      setFilteredProductos(productosCatalogo);
    } else {
      const productosFiltrados = productosCatalogo.filter((producto) =>
        producto.categorias && producto.categorias.some((cat) => cat._id === categoriaId)
      );
      setFilteredProductos(productosFiltrados);
    }
    setCurrentPage(1);
  };

  const handleDetalleClick = (producto) => {
    setProductoSeleccionado(producto);
    setOpenDetalleDialog(true);
  };

  const handleCloseDetalleDialog = () => {
    setOpenDetalleDialog(false);
    setProductoSeleccionado(null);
  };


  

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };



  const indexOfLastProduct = currentPage * productosPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productosPerPage;
  const currentProductos = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);

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
          {!showProductos ? (
            <>
              <Typography variant="h4" align="center" gutterBottom>
                CATÁLOGOS DE PELUCHES
              </Typography>
              
              <Grid container spacing={3}>
                {catalogos.map((catalogo) => (
                  <Grid item xs={12} sm={6} md={4} key={catalogo._id}>
                    <Card sx={{ 
                      transition: 'transform 0.3s', 
                      '&:hover': { transform: 'scale(1.05)' }, 
                      borderRadius: 3, 
                      boxShadow: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <CardMedia
                        component="img"
                        height="330"
                        image={catalogo.imagen || 'default-image-url.jpg'}
                        alt={catalogo.nombreCatalogo}
                        sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0', borderRadius: '12px 12px 0 0' }}
                      />
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" textAlign="center">
                      {catalogo.nombreCatalogo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Descripción:</strong> {catalogo.descripcionCatalogo}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="center">
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => handleDetalles(catalogo)}
                        sx={{ borderRadius: '20px' }}
                      >
                        Ver Productos
                      </Button>
                    </Box>
                  </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
            <Box 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center" 
              px={{ xs: 1, sm: 1 }}
              py={{ xs: 0.6, sm: 0.8 }} 
              bgcolor="#fff0f6" 
              borderRadius="12px" 
              boxShadow="0 1px 4px rgba(0,0,0,0.05)"
              sx={{
                width: "100%",
                maxWidth: "lg",
                margin: "0 auto", 
              }}
            >
              <Typography 
                variant="h6" 
                fontWeight="400"  
                color="#d63384" 
                sx={{ fontSize: { xs: "10px", sm: "12px", md: "14px" }, textAlign: { xs: "center", sm: "left" } }}
              >
                Regresa al catálogo cuando quieras ✨
              </Typography>
              <Button 
                onClick={handleBackToCatalogos} 
                sx={{ 
                  px: { xs: 1.8, sm: 2 }, 
                  py: { xs: 0.8, sm: 1 }, 
                  borderRadius: "20px", 
                  fontWeight: "400", 
                  fontSize: { xs: "10px", sm: "11px", md: "12px" }, 
                  textTransform: "uppercase",
                  background: "linear-gradient(to right, #ff80ab, #8c7fe8)",
                  color: "#fff",
                  boxShadow: "0 2px 4px rgba(247, 143, 179, 0.2)", 
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)", 
                    background: "linear-gradient(to right, #8c7fe8, #ff80ab)",
                    boxShadow: "0 4px 6px rgba(247, 143, 179, 0.3)", 
                  },
                }}
                startIcon={<span style={{ fontSize: "14px" }}>✨</span>} 
              >
                Volver
              </Button>
            </Box>

                            
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{
                fontWeight: "700", 
                color: "#d4af37", 
                fontSize: { xs: "18px", sm: "22px", md: "30px", lg: "38px" }, 
                textTransform: "uppercase", 
                letterSpacing: "2px", 
                fontFamily: "'Lora', serif", 
                textShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)", 
                lineHeight: 1.4, 
              }}
            >
              Productos del Catálogo: {selectedCatalogo.nombreCatalogo}
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
                  {categoriasCatalogo.map((categoria) => (
                    <MenuItem key={categoria._id} value={categoria._id}>
                      {categoria.nombreCategoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={3}>
                {currentProductos.length > 0 ? (
                  currentProductos.map((producto) => (
                    <Grid item xs={12} sm={6} md={3} key={producto._id}>
                      <Card sx={{ 
                        transition: 'transform 0.3s', 
                        '&:hover': { transform: 'scale(1.05)' }, 
                        borderRadius: 3, 
                        boxShadow: 3 
                      }}>
                        <CardMedia
                          component="img"
                          height="330"
                          image={producto.imagen || 'default-image-url.jpg'}
                          alt={producto.estiloProducto}
                          sx={{ objectFit: 'cover', backgroundColor: '#f0f0f0', borderRadius: '12px 12px 0 0' }}
                        />
                       <CardContent sx={{ textAlign: 'left' }}>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Precio:</strong>
                        {producto.historialPrecios?.map((precioId, index) => {
                          const precio = historialPrecios.find(p => p._id === precioId);
                          return precio ? (
                            <div key={index}>
                              {new Intl.NumberFormat('es-CO', { 
                                style: 'currency', 
                                currency: 'COP' 
                              }).format(precio.precio)}
                            </div>
                          ) : null;
                        })}
                         <strong>Tamaño:</strong> {producto.tamañoProducto}
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
                  ))
                ) : (
                  <Typography variant="body1" sx={{ width: '100%', textAlign: 'center', p: 3 }}>
                    {productosCatalogo.length === 0 
                      ? 'No hay productos en este catálogo' 
                      : 'No hay productos en la categoría seleccionada'}
                  </Typography>
                )}
              </Grid>

              {filteredProductos.length > productosPerPage && (
                <Box mt={4} display="flex" justifyContent="center">
                  <Pagination
                    count={Math.ceil(filteredProductos.length / productosPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}

              <Dialog 
                open={openDetalleDialog} 
                onClose={handleCloseDetalleDialog} 
                maxWidth="sm" 
                fullWidth={false}
              >
                <DialogContent sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center", 
                  padding: 2, 
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
                          borderRadius: "10px",
                          width: "auto",
                          objectFit: "contain",
                          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                          marginBottom: 2,
                        }}
                      />
                     
                      <Box sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: 1, 
                        width: "90%", 
                        alignItems: "flex-start" 
                      }}>
                        <Typography variant="body2" sx={{ textAlign: "left" }} gutterBottom>
                          <strong>Descripción del Producto:</strong> {productoSeleccionado.estiloProducto}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "left" }}>
                          <strong>Tamaño:</strong> {productoSeleccionado.tamañoProducto}
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "left" }}>
                          <strong>Disponibilidad:</strong> {productoSeleccionado.disponibilidadProducto}
                        </Typography>
                      </Box>
                    </>
                  )}
                  <Button 
                    onClick={handleCloseDetalleDialog} 
                    variant="contained" 
                    color="secondary" 
                    sx={{ 
                      mt: 2, 
                      borderRadius: "20px", 
                      px: 3, 
                      py: 1, 
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" 
                    }}
                  >
                    Cerrar
                  </Button>
                </DialogContent>
              </Dialog>

               <Dialog open={openCarritoDialog} onClose={handleCloseCarritoDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>Detalles del pedido</DialogTitle>
                    <DialogContent>
                      {productoSeleccionado && (
                        <>
                          <Typography variant="body1" gutterBottom><strong>Producto:</strong> {productoSeleccionado.estiloProducto}</Typography>
                          <Typography variant="body1" gutterBottom><strong>Tamaño:</strong> {productoSeleccionado.tamañoProducto}</Typography>
                          <Typography variant="body1" gutterBottom>
                            <strong>Precio:</strong> 
                            {productoSeleccionado.historialPrecios?.map((precioId, index) => {
                              const precio = historialPrecios.find(p => p._id === precioId);
                              return precio ? (
                                <span key={index}>
                                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio.precio)}
                                </span>
                              ) : null;
                            })}
                          </Typography>

                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Información del Comprador</Typography>
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
                              label="Nombre del Comprador"
                              fullWidth
                              name="nombreComprador"
                              value={pedido.nombreComprador}
                              onChange={handleInputChange}
                              sx={{ marginBottom: 2 }}
                            />
                            <TextField
                              label="Número de Contacto"
                              fullWidth
                              name="numeroComprador"
                              value={pedido.numeroComprador}
                              onChange={handleInputChange}
                              sx={{ marginBottom: 2 }}
                            />
                          </Box>

                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Información del Agendador</Typography>
                            <TextField
                              label="Nombre del Agendador"
                              fullWidth
                              name="nombreAgendador"
                              value={pedido.nombreAgendador}
                              onChange={handleInputChange}
                              sx={{ marginBottom: 2 }}
                            />
                            <TextField
                              label="Número del Agendador"
                              fullWidth
                              name="numeroAgendador"
                              value={pedido.numeroAgendador}
                              onChange={handleInputChange}
                              sx={{ marginBottom: 2 }}
                            />
                          </Box>

                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>Datos de Entrega</Typography>
                            <TextField
                              label="Localidad"
                              fullWidth
                              name="localidad"
                              value={pedido.localidad}
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
                          </Box>
                        </>
                      )}
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                      <Button 
                        onClick={handleCloseCarritoDialog} 
                        variant="outlined" 
                        sx={{ mr: 2 }}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleSubmitPedido} 
                        variant="contained" 
                        color="secondary"
                        size="large"
                      >
                        Enviar Pedido
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                    <Alert severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
                      {snackbarMessage}
                    </Alert>
                  </Snackbar>
  
  

                    <Snackbar 
                      open={openSnackbar} 
                      autoHideDuration={6000} 
                      onClose={() => setOpenSnackbar(false)}
                    >
                      <Alert 
                        onClose={() => setOpenSnackbar(false)} 
                        severity="error" 
                        sx={{ width: '100%' }}
                      >
                        {snackbarMessage}
                      </Alert>
                    </Snackbar>
                  </>
                )}
              </Container>
      </Box>
    </Box>
  );
}
