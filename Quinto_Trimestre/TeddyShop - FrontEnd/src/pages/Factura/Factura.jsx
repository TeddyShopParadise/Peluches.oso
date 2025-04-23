import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TablePagination,
  Typography,
  Tooltip,
  Chip,
  FormControlLabel,
  Switch,
  Snackbar, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  Checkbox
} from '@mui/material';
import sortBy from 'lodash/sortBy';
import { Edit, Delete, ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';
import Swal from 'sweetalert2';


const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);


const Facturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [factura, setFactura] = useState({
    fechaCreacionFactura: '',
    horaCreacionFactura: '',
    pedido: {},
    cliente: '',
    detallesFactura: [],
    metodoPago: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  

  const fetchMetodosPago = async () => {
    try {
      const response = await fetch(`${apiUrl}/metodoPago`);
      const data = await response.json();
      setMetodosPago(data);
    } catch (error) {
      console.error('Error fetching métodos de pago:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacturas();
    fetchMetodosPago();
  }, []);

  const { makeRequest } = useApiRequest();


  const fetchFacturas = async () => {
    try {
      const response = await fetch(`${apiUrl}/factura`);
      const data = await response.json();
      setFacturas(data);
    } catch (error) {
      console.error('Error al listar las facturas:', error);
    }
  };

  const crearFactura = async () => {
    try {
      const response = await fetch(`${apiUrl}/factura`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        fetchFacturas();
      } else {
        console.error('Error al crear factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la creación de factura:', error);
    }
  };

  const actualizarFactura = async () => {
    try {
      const response = await fetch(`${apiUrl}/factura/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
      });

      if (response.ok) {
        setEditing(false);
        setCurrentId(null);
        setFactura({
          fechaCreacionFactura: '',
          horaCreacionFactura: '',
          pedido: '',
          cliente: '',
          detallesFactura: [],
          metodoPago: '',
        });
        fetchFacturas();
      } else {
        console.error('Error al actualizar factura:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la actualización de factura:', error);
    }
  };

  const obtenerFacturaPorId = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/factura/${id}`);
      const data = await response.json();
      setFactura(data);
      setEditing(true);
      setCurrentId(id);
    } catch (error) {
      console.error('Error al obtener factura:', error);
    }
  };

 // Eliminar factura
const eliminarFactura = async (id) => {
  await makeRequest({
    url: `${apiUrl}/factura/${id}`,
    method: 'DELETE',
    confirm: {
      title: 'Eliminar factura',
      text: '¿Estás seguro de que deseas eliminar esta factura? Esta acción no se puede deshacer.',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/warning.gif")
        center top
        no-repeat
      `
    },
    loading: {
      title: 'Eliminando...',
      html: 'Estamos eliminando la factura',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Factura eliminada!',
      text: 'La factura ha sido eliminada correctamente.',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al eliminar factura',
      text: (error) => error.message || 'Hubo un problema al eliminar la factura.',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: fetchFacturas 
  });
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      actualizarFactura();
    } else {
      crearFactura();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDetailDialog = (factura) => {
    setSelectedFactura(factura);
    setOpenDetails(true);
  };

  const closeDetailDialog = () => {
    setOpenDetails(false);
    setSelectedFactura(null);
  };

  const obtenerNombreMetodoPago = (metodoPagoId) => {
    if (!metodoPagoId) return "No especificado"; 
    
    const metodo = metodosPago.find((m) => m._id === metodoPagoId);
    return metodo ? metodo.nombreMetodoPago : "No especificado";
  };

  return (
   <Box className="BoxInicial">
         <Box className="Box"
           sx={{
             width: '90%',
             maxWidth: '900px',
             padding: { xs: '20px', md: '30px' },
             borderRadius: '30px',
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
              sx={{
                fontWeight: 'bold',
                color: '#b04e6f',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              }}
            >
              Gestión de Facturas
            </Typography>
          </Box>

          <Paper
            elevation={2}
            sx={{
              padding: '20px',
              borderRadius: '20px',
              marginBottom: '20px',
              backgroundColor: '#fff0f5',
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
            <Typography
              variant="h6"
              sx={{
                marginBottom: '15px',
                color: '#b04e6f',
                fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ListAlt fontSize="small" /> Lista de Facturas
            </Typography>

            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid #f8c8dc',
                overflowX: 'auto',
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#ffeef3' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Hora</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Pedido</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {facturas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((factura) => (
                    <TableRow
                      key={factura._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>{new Date(factura.fechaCreacionFactura).toLocaleDateString()}</TableCell>
                      <TableCell>{factura.horaCreacionFactura}</TableCell>
                      <TableCell>{factura.pedido?._id || factura.pedido}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => obtenerFacturaPorId(factura._id)}
                          sx={{
                            color: '#4caf50',
                            '&:hover': {
                              backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => eliminarFactura(factura._id)}
                          sx={{
                            color: '#e57373',
                            '&:hover': {
                              backgroundColor: 'rgba(229, 115, 115, 0.1)',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => openDetailDialog(factura)}
                          sx={{
                            color: '#845ef7',
                            '&:hover': {
                              backgroundColor: 'rgba(132, 94, 247, 0.1)',
                            },
                          }}
                        >
                          <Info />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={facturas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                color: '#b04e6f',
                '& .MuiTablePagination-selectIcon': {
                  color: '#f48fb1',
                },
              }}
            />
          </Paper>
        </Container>

        <Dialog 
          open={openDetails} 
          onClose={closeDetailDialog} 
          PaperProps={{
            sx: {
              borderRadius: '20px',
              backgroundColor: '#fff0f6',
              boxShadow: '0 8px 24px rgba(248, 200, 220, 0.4)',
              border: '1px solid #f8c8dc',
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              backgroundColor: '#fff0f5',
              borderBottom: '1px solid #f8c8dc',
            }}
          >
            Detalles de la Factura
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ px: 3, pt: 2, pb: 2, color: '#6f42c1' }}>
              <strong>Pedido: </strong>
              {selectedFactura && selectedFactura.pedido ? 
                (typeof selectedFactura.pedido === 'object' ? selectedFactura.pedido._id : selectedFactura.pedido) 
                : "No disponible"}<br />
              
              <strong>Método de Pago: </strong>
              {selectedFactura && selectedFactura.metodoPago ? 
                (typeof selectedFactura.metodoPago === 'object' ? selectedFactura.metodoPago.nombreMetodoPago : obtenerNombreMetodoPago(selectedFactura.metodoPago))
                : "No especificado"}<br />
              
              <strong>Fecha: </strong>
              {selectedFactura && selectedFactura.fechaCreacionFactura ? 
                new Date(selectedFactura.fechaCreacionFactura).toLocaleDateString() 
                : "No disponible"}<br />
              
              <strong>Hora: </strong>
              {selectedFactura && selectedFactura.horaCreacionFactura ? 
                selectedFactura.horaCreacionFactura 
                : "No disponible"}
            </DialogContentText>

            {selectedFactura && selectedFactura.detallesFactura && Array.isArray(selectedFactura.detallesFactura) && (
              <TableContainer 
                component={Paper} 
                sx={{ 
                  m: 2, 
                  backgroundColor: '#ffeaf1', 
                  borderRadius: '15px',
                  border: '1px solid #f8c8dc',
                }}
              >
                <Table size="small">
                  <TableHead sx={{ backgroundColor: '#ffeef3' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Inventario</TableCell>

                      <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFactura.detallesFactura.map((detalle, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {detalle.idProducto ? 
                            (typeof detalle.idProducto === 'object' ? 
                              (detalle.idProducto._id || detalle.idProducto._id) : 
                              detalle.idProducto) : 
                            "N/A"}
                        </TableCell>
                        <TableCell>
                          {detalle.idInventario ? 
                            (typeof detalle.idInventario === 'object' ? 
                              (detalle.idInventario._id || detalle.idInventario._id) : 
                              detalle.idInventario) : 
                            "N/A"}
                        </TableCell>
                        <TableCell>{detalle.cantidadDetalleFactura}</TableCell>
                        <TableCell>${detalle.precioDetalleFactura}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DialogContent>
          <DialogActions sx={{ backgroundColor: '#fff0f5', borderTop: '1px solid #f8c8dc' }}>
            <Button 
              onClick={closeDetailDialog} 
              sx={{
                color: '#f48fb1',
                '&:hover': {
                  backgroundColor: 'rgba(244, 143, 177, 0.1)',
                },
                fontWeight: 'bold',
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
  
};

export default Facturas;
