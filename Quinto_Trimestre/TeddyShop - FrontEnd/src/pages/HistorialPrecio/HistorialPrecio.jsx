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
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

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
      const token = getAuthToken();
      const response = await fetch(`${apiUrl}/historialPrecio`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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


  // Crear nuevo historial de precio
  const crearHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
	const token = getAuthToken();
      const response = await fetch(`${apiUrl}/historialPrecio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(nuevoHistorial),
      });
  
      if (response.ok) {
        fetchHistorialPrecios(); // Actualiza la lista después de crear
        resetForm();
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
      } else {
        console.error('Error al crear el historial de precio');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  
  //Actualizar un historial de precio
  const actualizarHistorialPrecio = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const data = {
        precio: parseFloat(nuevoHistorial.precio),// Convertir a número
        fechaInicio: nuevoHistorial.fechaInicio,
        fechaFin: nuevoHistorial.fechaFin,
        estadoPrecio: nuevoHistorial.estadoPrecio
      };
  
      const response = await fetch(`${apiUrl}/historialPrecio/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        fetchHistorialPrecios();
        resetForm();
        setNuevoHistorial({ precio: '', fechaInicio: '', fechaFin: '', estadoPrecio: true });
        setEditingId(null);
      } else {
        const errorText = await response.text();
        console.error('Error al actualizar el historial de precio:', errorText);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  
  //Eliminar el historial de Precio
  const eliminarHistorialPrecio = async (id) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const token = getAuthToken();
        const response = await fetch(`${apiUrl}/historialPrecio/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          Swal.fire('¡Eliminado!', 'El historial ha sido eliminado.', 'success');
          fetchHistorialPrecios();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el historial.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al eliminar el historial.', 'error');
      }
    }
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
    <Box
      sx={{
        height: { xs: 'auto', md: 'auto' },
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        py: 2,
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '100%',
          padding: { xs: '20px', md: '50px' },
          background:
            'linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 10s infinite linear',
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
            <strong>Precio:</strong> {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(selectedHistorial.precio)}
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
