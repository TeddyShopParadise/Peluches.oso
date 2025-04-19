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
import {  Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
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

  const handleOpenDetailsDialog = (movimiento) => {
    setSelectedMovimiento(movimiento);
    setOpenDetailsDialog(true);
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
