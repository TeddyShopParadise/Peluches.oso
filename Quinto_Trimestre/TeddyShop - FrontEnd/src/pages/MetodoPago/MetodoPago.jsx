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
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();

const MetodoPago = () => {
  const [metodosPago, setMetodosPago] = useState([]);
  const [nuevoMetodo, setNuevoMetodo] = useState({ nombreMetodoPago: '', factura: '' });
  const [editarMetodo, setEditarMetodo] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedMetodo, setSelectedMetodo] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('nombreMetodoPago');
  const [sortOrder, setSortOrder] = useState('asc');

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
    fetchMetodosPago();
  }, []);

  const crearMetodoPago = async () => {
    try {
      const response = await fetch(`${apiUrl}/metodoPago`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoMetodo),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const newMetodo = await response.json();
      setMetodosPago([...metodosPago, newMetodo]);
      setSnackbarMessage('Método de pago creado con éxito');
      setOpenSnackbar(true);
      setNuevoMetodo({ nombreMetodoPago: '', factura: '' });
    } catch (error) {
      console.error('Error creando método de pago:', error);
      setSnackbarMessage('Error al crear el método de pago: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const actualizarMetodoPago = async () => {
    if (!editarMetodo) return;

    const metodoActualizar = {
      nombreMetodoPago: nuevoMetodo.nombreMetodoPago,
      factura: nuevoMetodo.factura,
    };

    try {
      const response = await fetch(`${apiUrl}/metodoPago/${editarMetodo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metodoActualizar),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const updatedMetodo = await response.json();
      setMetodosPago(metodosPago.map((metodo) => (metodo._id === updatedMetodo._id ? updatedMetodo : metodo)));
      setSnackbarMessage('Método de pago actualizado con éxito');
      setOpenSnackbar(true);
      setEditarMetodo(null);
      setNuevoMetodo({ nombreMetodoPago: '', factura: '' });
    } catch (error) {
      console.error('Error actualizando el método de pago:', error);
      setSnackbarMessage('Error al actualizar el método de pago: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const eliminarMetodoPago = async () => {
    if (!currentId) return;

    try {
      await fetch(`${apiUrl}/metodoPago/${currentId}`, {
        method: 'DELETE',
      });
      setMetodosPago((prevMetodos) => prevMetodos.filter((metodo) => metodo._id !== currentId));
      setSnackbarMessage('Método de pago eliminado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error eliminando el método de pago:', error);
      setSnackbarMessage('Error al eliminar el método de pago');
      setOpenSnackbar(true);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortBy(field);
  };

  const handleEditClick = (metodo) => {
    setEditarMetodo(metodo);
    setNuevoMetodo({ nombreMetodoPago: metodo.nombreMetodoPago, factura: metodo.factura._id || '' });
  };

  const handleDetailClick = (metodo) => {
    setSelectedMetodo(metodo);
    setOpenDetailDialog(true);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredMetodosPago = metodosPago.filter((metodo) =>
    metodo.nombreMetodoPago && metodo.nombreMetodoPago.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMetodosPago = [...filteredMetodosPago].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: '90%',
          maxWidth: '100%',
          padding: '50px',
          borderRadius: '30px',
        }}
      >
        <Container>
          <h1>Métodos de Pago</h1>
          <Box mb={4}>
            <TextField
              label="Nombre del Método de Pago"
              value={nuevoMetodo.nombreMetodoPago}
              onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, nombreMetodoPago: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Factura"
              value={nuevoMetodo.factura}
              onChange={(e) => setNuevoMetodo({ ...nuevoMetodo, factura: e.target.value })}
              fullWidth
              margin="normal"
            />
            {editarMetodo ? (
              <Button variant="contained" onClick={actualizarMetodoPago}>
                Actualizar
              </Button>
            ) : (
              <Button variant="contained" onClick={crearMetodoPago}>
                Crear
              </Button>
            )}
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Métodos de Pago</h2>
            <TextField
              label="Buscar por nombre"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: 250 }}
            />
          </Box>

          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('nombreMetodoPago')}>
                      Nombre del Método de Pago
                      {sortBy === 'nombreMetodoPago' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('factura')}>
                      Factura
                      {sortBy === 'factura' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedMetodosPago.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((metodo) => (
                  <TableRow key={metodo._id}>
                    <TableCell>{metodo.nombreMetodoPago}</TableCell>
                    <TableCell>{metodo.factura ? metodo.factura._id : 'No disponible'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(metodo)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => {
                        setCurrentId(metodo._id);
                        setOpenDeleteDialog(true);
                      }}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleDetailClick(metodo)}>
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
            count={filteredMetodosPago.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Snackbar para mostrar mensajes */}
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          {/* Diálogo de eliminación */}
          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Eliminar Método de Pago</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este método de pago?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
              <Button onClick={eliminarMetodoPago} color="error">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Diálogo de detalles */}
          <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)}>
            <DialogTitle>Detalles del Método de Pago</DialogTitle>
            <DialogContent>
              {selectedMetodo && (
                <DialogContentText>
                  <strong>Nombre:</strong> {selectedMetodo.nombreMetodoPago} <br />
                  <strong>ID Factura:</strong> {selectedMetodo.factura ? selectedMetodo.factura._id : 'N/A'} <br />
                  <strong>Fecha de Creación Factura:</strong> {selectedMetodo.factura ? new Date(selectedMetodo.factura.fechaCreacionFactura).toLocaleDateString() : 'N/A'}<br />
                  <strong>Hora de Creación Factura:</strong> {selectedMetodo.factura ? selectedMetodo.factura.horaCreacionFactura : 'N/A'} <br />
                  <strong>ID Pedido:</strong> {selectedMetodo.factura ? selectedMetodo.factura.pedido : 'N/A'} <br />
                  <strong>ID Cliente:</strong> {selectedMetodo.factura ? selectedMetodo.factura.cliente : 'N/A'} <br />
                  <strong>ID Detalle Factura:</strong> {selectedMetodo.factura ? selectedMetodo.factura.detallesFactura : 'N/A'} <br />
                </DialogContentText>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetailDialog(false)}>Cerrar</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default MetodoPago;
