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

  const totalIngreso = filteredMovimientos.reduce(
    (acc, mov) => acc + (mov.cantidadIngreso || 0),
    0
  );
  
  const totalVendido = filteredMovimientos.reduce(
    (acc, mov) => acc + (mov.cantidadVendida || 0),
    0
  );

  return (
    <Box className="BoxInicial">
      <Box
        className="Box"
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
            Movimientos de Inventario
          </Typography>
        </Box>
  
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'center', 
            marginBottom: 4 
          }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: '1 1 200px',
              backgroundColor: '#fce4ec',
              border: '1px solid #f8c8dc',
              borderRadius: '20px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" color="#b04e6f" fontWeight="bold">
              Total Ingresos
            </Typography>
            <Typography variant="h5" color="#2e7d32" fontWeight="bold">
              {totalIngreso}
            </Typography>
          </Paper>
  
          <Paper
            elevation={3}
            sx={{
              flex: '1 1 200px',
              backgroundColor: '#fce4ec',
              border: '1px solid #f8c8dc',
              borderRadius: '20px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" color="#b04e6f" fontWeight="bold">
              Total Vendido
            </Typography>
            <Typography variant="h5" color="#c62828" fontWeight="bold">
              {totalVendido}
            </Typography>
          </Paper>
  
          <Paper
            elevation={3}
            sx={{
              flex: '1 1 200px',
              backgroundColor: '#fce4ec',
              border: '1px solid #f8c8dc',
              borderRadius: '20px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" color="#b04e6f" fontWeight="bold">
              Movimientos Totales
            </Typography>
            <Typography variant="h5" color="#6a1b9a" fontWeight="bold">
              {filteredMovimientos.length}
            </Typography>
          </Paper>
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
            <ListAlt fontSize="small" /> Lista de Movimientos
          </Typography>
  
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
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
            <TextField
              name="fecha"
              value={filters.fecha}
              onChange={handleFilterChange}
              label="Buscar por fecha"
              variant="outlined"
              size="small"
              sx={{ 
                width: { xs: '100%', sm: '300px' },
                backgroundColor: 'white',
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
  
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: '15px',
              overflow: 'hidden',
              border: '1px solid #f8c8dc',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ingreso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Vendido</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Inventario</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMovimientos
                  .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                  .map((movimiento) => (
                    <TableRow 
                      key={movimiento._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>
                        {new Date(movimiento.fecha).toLocaleString('es-CO', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={movimiento.cantidadIngreso} 
                          sx={{
                            backgroundColor: '#e8f5e9',
                            color: '#2e7d32',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={movimiento.cantidadVendida} 
                          sx={{
                            backgroundColor: '#ffebee',
                            color: '#c62828',
                            fontWeight: 'bold'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {movimiento.inventario?._id || 'N/A'}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleDelete(movimiento._id)}
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
                          onClick={() => handleOpenDetailsDialog(movimiento)}
                          sx={{
                            color: '#6c63ff',
                            '&:hover': {
                              backgroundColor: 'rgba(108, 99, 255, 0.1)',
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
            count={filteredMovimientos.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
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
  
        <Dialog
          open={openDetailsDialog}
          onClose={handleCloseDetailsDialog}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              backgroundColor: '#fff5f7',
              border: '1px solid #f8c8dc',
              maxWidth: '500px',
            }
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: '#ffeef3',
              color: '#b04e6f',
              fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
              borderBottom: '1px solid #f8c8dc',
            }}
          >
            Detalles del Movimiento
          </DialogTitle>
          <DialogContent>
            {selectedMovimiento && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>Fecha:</strong>{' '}
                  {new Date(selectedMovimiento.fecha).toLocaleString('es-CO', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>Cantidad Ingreso:</strong>
                  <Chip
                    label={selectedMovimiento.cantidadIngreso}
                    sx={{
                      ml: 1,
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 'bold'
                    }}
                  />
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong style={{ color: '#b04e6f' }}>Cantidad Vendida:</strong>
                  <Chip
                    label={selectedMovimiento.cantidadVendida}
                    sx={{
                      ml: 1,
                      backgroundColor: '#ffebee',
                      color: '#c62828',
                      fontWeight: 'bold'
                    }}
                  />
                </Typography>
                <Typography variant="body1">
                  <strong style={{ color: '#b04e6f' }}>Inventario:</strong>{' '}
                  {selectedMovimiento.inventario?._id || 'N/A'}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: '#ffeef3',
              borderTop: '1px solid #f8c8dc',
            }}
          >
            <Button
              onClick={handleCloseDetailsDialog}
              sx={{
                color: '#f48fb1',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(244, 143, 177, 0.1)',
                },
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

export default Movimientos;
