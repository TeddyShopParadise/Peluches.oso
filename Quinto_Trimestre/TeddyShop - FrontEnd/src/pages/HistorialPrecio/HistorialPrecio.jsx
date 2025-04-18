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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Box,
  TablePagination,
  Switch,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Swal from 'sweetalert2';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

  /*const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };*/
  

const HistorialPrecios = () => {
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [nuevoHistorial, setNuevoHistorial] = useState({
    precio: '',
    fechaInicio: '',
    fechaFin: '',
    estadoPrecio: true
  });
  const [editingId, setEditingId] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedHistorial, setSelectedHistorial] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  // Obtener historial de precios
  const fetchHistorialPrecios = async () => {
    try {
      //const token = getAuthToken();
      const response = await fetch(`${apiUrl}/historialPrecio`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setHistorialPrecios(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchHistorialPrecios();
  }, []);


const { makeRequest } = useApiRequest();
// Crear nuevo historial de precio
const crearHistorialPrecio = async (e) => {
  e.preventDefault();

  const { precio, fechaInicio, fechaFin } = nuevoHistorial;

  if (!precio || !fechaInicio || !fechaFin) {
    await Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos requeridos.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6',
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/empty-field.gif")
        center top
        no-repeat
      `
    });
    return;
  }

  await makeRequest({
    url: `${apiUrl}/historialPrecio`,
    method: 'POST',
    data: nuevoHistorial,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    confirm: {
      title: 'Crear nuevo historial',
      text: '¿Estás seguro de que deseas crear este historial de precio?',
      icon: 'question',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos creando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial creado!',
      text: 'El historial de precio se ha creado correctamente.',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al crear historial',
      text: (error) => error.message || 'Ocurrió un error al conectar con el servidor.',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchHistorialPrecios();
      resetForm();
      setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
    }
  });
};

// Actualizar historial de precio
const actualizarHistorialPrecio = async (e) => {
  e.preventDefault();

  const { precio, fechaInicio, fechaFin } = nuevoHistorial;

  if (!editingId || !precio || !fechaInicio || !fechaFin) {
    await Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos requeridos.',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6',
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/empty-field.gif")
        center top
        no-repeat
      `,
      background: '#f8f9fa'
    });
    return;
  }

  const data = {
    precio: parseFloat(nuevoHistorial.precio),
    fechaInicio: nuevoHistorial.fechaInicio,
    fechaFin: nuevoHistorial.fechaFin,
    estadoPrecio: nuevoHistorial.estadoPrecio,
  };

  await makeRequest({
    url: `${apiUrl}/historialPrecio/${editingId}`,
    method: 'PUT',
    data: data,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    },
    confirm: {
      title: 'Actualizar historial',
      text: '¿Estás seguro de que deseas actualizar este historial de precio?',
      icon: 'question',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos actualizando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial actualizado!',
      text: 'El historial de precio se ha actualizado correctamente.',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    },
    error: {
      icon: 'error',
      title: 'Error en la actualización',
      html: (error) => `<div style="text-align:left;">
             <p>${error.message}</p>
             <small>Si el problema persiste, contacte al administrador</small>
           </div>`,
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchHistorialPrecios();
      resetForm();
      setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
      setEditingId(null);
    }
  });
};

// Eliminar historial de precio
const eliminarHistorialPrecio = async (id) => {
  await makeRequest({
    url: `${apiUrl}/historialPrecio/${id}`,
    method: 'DELETE',
    // headers: { 'Authorization': `Bearer ${token}` },
    confirm: {
      title: 'Eliminar historial',
      text: '¿Estás seguro de que deseas eliminar este historial? Esta acción no se puede deshacer.',
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
      html: 'Estamos eliminando el historial de precio',
      allowOutsideClick: false
    },
    success: {
      icon: 'success',
      title: '¡Historial eliminado!',
      text: 'El historial ha sido eliminado correctamente.',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      icon: 'error',
      title: 'Error al eliminar historial',
      text: (error) => error.message || 'Hubo un problema al eliminar el historial.',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: fetchHistorialPrecios
  });
};

  // Maneja el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoHistorial((prev) => ({ ...prev, [name]: value }));
  };

  // Iniciar edición
  const iniciarEdicion = (historial) => {
    setNuevoHistorial(historial);
    setEditingId(historial._id);
  };

  const resetForm = () => {
   
    setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
    setEditingId(null);
  };

  // Paginación de la tabla
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Abrir el diálogo de detalles
  const handleOpenDetails = (historial) => {
    setSelectedHistorial(historial);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedHistorial(null);
  };

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
        <Container>
          <h1>Historial de Precios</h1>
  
          <form onSubmit={editingId ? actualizarHistorialPrecio : crearHistorialPrecio} noValidate autoComplete="off">
            <TextField
              type="number"
              name="precio"
              label="Precio"
              value={nuevoHistorial.precio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="date"
              name="fechaInicio"
              label="Fecha de Inicio"
              value={nuevoHistorial.fechaInicio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              type="date"
              name="fechaFin"
              label="Fecha de Fin"
              value={nuevoHistorial.fechaFin}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="estadoPrecio"
                  checked={nuevoHistorial.estadoPrecio}
                  onChange={(e) => setNuevoHistorial({ ...nuevoHistorial, estadoPrecio: e.target.checked })}
                />
              }
              label="Estado Precio"
              sx={{
                '& .MuiTypography-root': { fontSize: '1.2rem' },
              }}
            />
            
                     <Box display="flex" justifyContent="space-between" mt={2}>
                       <Button
                         type="submit"
                         variant="contained"
                         sx={{ fontSize: '1.2rem', width: '48%' }}
                       >
                         {editingId ? 'Actualizar' : 'Crear'}
                       </Button>
                       <Button
                         type="button"
                         variant="outlined"
                         onClick={resetForm}
                         sx={{
                           fontSize: '1.2rem',
                           width: '48%',
                           backgroundColor: 'transparent',
                         }}
                       >
                         Cancelar
                       </Button>
                     </Box>
                   </form>
                       
                   
  
          <Box mt={4}>
            <h2>Lista de Historial de Precios</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Precio</TableCell>
                    <TableCell>Fecha Inicio</TableCell>
                    <TableCell>Fecha Fin</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell >Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historialPrecios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historial) => (
                    <TableRow key={historial._id}>
                      <TableCell>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(historial.precio)}</TableCell>
                      <TableCell>{new Date(historial.fechaInicio).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(historial.fechaFin).toLocaleDateString()}</TableCell>
                      <TableCell>{historial.estadoPrecio ? 'Activo' : 'Inactivo'}</TableCell>
                     
                      <TableCell>
                        
                        <IconButton
                        color="primary"
                        onClick={() => iniciarEdicion(historial)}>
                          <Edit />
                        </IconButton>
                        <IconButton 
                      sx={{ color: "#d33" }}
                        onClick={() => eliminarHistorialPrecio(historial._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton
                         color="info"
                        onClick={() => handleOpenDetails(historial)}>
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
              count={historialPrecios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </Box>

      {/* Diálogo de detalles */}
      {selectedHistorial && (
        <Dialog open={openDetailsDialog} onClose={handleCloseDetails}>
          <DialogTitle>Detalles del Historial de Precio</DialogTitle>
          <DialogContent>
            <DialogContentText>
            
              <br />
              <strong>Fecha Inicio:</strong> {new Date(selectedHistorial.fechaInicio).toLocaleDateString()}
              <br />
              <strong>Fecha Fin:</strong> {new Date(selectedHistorial.fechaFin).toLocaleDateString()}
              <br />
              <strong>Estado:</strong> {selectedHistorial.estadoPrecio ? 'Activo' : 'Inactivo'}
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default HistorialPrecios ;
