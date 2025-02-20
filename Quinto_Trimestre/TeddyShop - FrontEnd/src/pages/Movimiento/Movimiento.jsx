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
console.log("Url almacenada: ",apiUrl);

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [formData, setFormData] = useState({
    fecha: '',
    cantidadIngreso: '',
    cantidadVendida: '',
    inventario: ''
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedMovimiento, setSelectedMovimiento] = useState(null);
  const [filters, setFilters] = useState({
    fecha: '',
    cantidadIngreso: '',
    cantidadVendida: ''
  });

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const fetchMovimientos = async () => {
    try {
      const response = await fetch(`${apiUrl}/movimiento`);
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      console.error('Error fetching movimientos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId 
      ? `${apiUrl}/movimiento/${editId}` 
      : `${apiUrl}/movimiento`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchMovimientos();
        setFormData({ fecha: '', cantidadIngreso: 0, cantidadVendida: 0, inventario: '' });
        setEditId(null);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating/updating movimiento:', error);
    }
  };

  const handleEdit = (movimiento) => {
    setFormData({
      fecha: movimiento.fecha,
      cantidadIngreso: movimiento.cantidadIngreso,
      cantidadVendida: movimiento.cantidadVendida,
      inventario: movimiento.inventario
    });
    setEditId(movimiento._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/movimiento/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchMovimientos();
      } else {
        console.error('Error deleting movimiento:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movimiento:', error);
    }
  };

  const handleOpenDetailsDialog = (movimiento) => {
    setSelectedMovimiento(movimiento);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedMovimiento(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredMovimientos = movimientos.filter((movimiento) => {
    return (
      (!filters.fecha || new Date(movimiento.fecha).toLocaleDateString().includes(filters.fecha)) &&
      (!filters.cantidadIngreso || movimiento.cantidadIngreso.toString().includes(filters.cantidadIngreso)) &&
      (!filters.cantidadVendida || movimiento.cantidadVendida.toString().includes(filters.cantidadVendida))
    );
  });

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
          <h1>Movimientos</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              //label="Cantidad de Ingreso"
              type="number"
              name="cantidadIngreso"
              value={formData.cantidadIngreso}
              onChange={handleChange}
              placeholder="Cantidad Ingreso"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              //label="Cantidad Vendida"
              type="number"
              name="cantidadVendida"
              value={formData.cantidadVendida}
              onChange={handleChange}
              placeholder="Cantidad Vendida"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <TextField
              type="text"
              name="inventario"
              value={formData.inventario}
              onChange={handleChange}
              placeholder="Inventario ID"
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' }, // Tamaño de la etiqueta
                '& .MuiInputBase-input': { fontSize: '1.2rem' }, // Tamaño de entrada
              }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2, fontSize: '1.2rem' }}>
              {editId ? 'Actualizar' : 'Crear'}
            </Button>
          </form>

          <Box mt={4}>
            <h2>Lista de Movimientos</h2>

            {/* Filtros */}
            <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: 2 }}>
              <TextField
                name="fecha"
                value={filters.fecha}
                onChange={handleFilterChange}
                label="Buscar por fecha"
                variant="outlined"
                size="small"
                sx={{ width: '30%' }}
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Cantidad Ingreso</TableCell>
                    <TableCell>Cantidad Vendida</TableCell>
                    <TableCell>Inventario</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMovimientos
                    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                    .map((movimiento) => (
                      <TableRow key={movimiento._id}>
                        <TableCell>{new Date(movimiento.fecha).toLocaleString()}</TableCell>
                        <TableCell>{movimiento.cantidadIngreso}</TableCell>
                        <TableCell>{movimiento.cantidadVendida}</TableCell>
                        <TableCell>{movimiento.inventario?._id || 'N/A'}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(movimiento)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(movimiento._id)}>
                            <Delete />
                          </IconButton>
                          <IconButton onClick={() => handleOpenDetailsDialog(movimiento)}>
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
              count={filteredMovimientos.length}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </Box>

      {/* Dialog de Detalles */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>Detalles del Movimiento</DialogTitle>
        <DialogContent>
          {selectedMovimiento && (
            <DialogContentText>
              <strong>Fecha:</strong> {new Date(selectedMovimiento.fecha).toLocaleString()} <br />
              <strong>Cantidad Ingreso:</strong> {selectedMovimiento.cantidadIngreso} <br />
              <strong>Cantidad Vendida:</strong> {selectedMovimiento.cantidadVendida} <br />
              <strong>Inventario:</strong> {selectedMovimiento.inventario?._id || 'N/A'} <br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Movimientos;
