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
import Swal from 'sweetalert2';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Devoluciones = () => {
    const [devoluciones, setDevoluciones] = useState([]);
    const [devolucion, setDevolucion] = useState({ detalleDevolucion: '', inventarios: [] });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('detalleDevolucion');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchDevoluciones = async () => {
        try {
            const response = await fetch(`${apiUrl}/devoluciones`);
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setDevoluciones(data);
        } catch (error) {
            console.error('Error fetching devoluciones:', error);
        }
    };

    useEffect(() => {
        fetchDevoluciones();
    }, []);

    const handleSubmit = async () => {
        try {
            // Elimina el campo '_id' para evitar el error del servidor
            const devolucionData = { ...devolucion };
            delete devolucionData._id;
            delete devolucionData.__v;
    
            console.log("Datos enviados:", devolucionData);
    
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing
                ? `${apiUrl}/devoluciones/${currentId}`
                : `${apiUrl}/devoluciones`;
    
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(devolucionData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                throw new Error('Error al crear/actualizar la devolución');
            }
    
            setSnackbarMessage(isEditing ? 'Devolución actualizada' : 'Devolución creada');
            setOpenSnackbar(true);
            fetchDevoluciones();
            resetForm();
        } catch (error) {
            console.error('Error submitting devolucion:', error.message);
            setSnackbarMessage('Error al crear/actualizar la devolución');
            setOpenSnackbar(true);
        }
    };
    


    const handleDelete = async () => {
        try {
            await fetch(`${apiUrl}/devoluciones/${currentId}`, { method: 'DELETE' });
            setSnackbarMessage('Devolución eliminada');
            setOpenSnackbar(true);
            fetchDevoluciones();
        } catch (error) {
            console.error('Error deleting devolucion:', error);
            setSnackbarMessage('Error al eliminar la devolución');
            setOpenSnackbar(true);
        } finally {
            setOpenDeleteDialog(false);
        }
    };

    const resetForm = () => {
        setDevolucion({ detalleDevolucion: '', inventarios: [] });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleEditClick = (devolucion) => {
        setDevolucion(devolucion);
        setIsEditing(true);
        setCurrentId(devolucion._id);
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

    const filteredDevoluciones = devoluciones.filter((devolucion) =>
        devolucion.detalleDevolucion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedDevoluciones = [...filteredDevoluciones].sort((a, b) => {
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
              <Box sx={{ textAlign: 'center', marginBottom: '30px', position: 'relative', '&::after': {
                content: '""', position: 'absolute', bottom: '-10px', left: '25%', width: '50%', height: '4px',
                background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)', borderRadius: '10px'
              } }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#b04e6f', fontFamily: '"Baloo 2", cursive' }}>
                  Devoluciones
                </Typography>
              </Box>
    
              <Paper elevation={3} sx={{ padding: '20px', borderRadius: '20px', backgroundColor: '#fff5f7', marginBottom: '30px', border: '1px solid #f8c8dc' }}>
                <Typography variant="h6" sx={{ marginBottom: '15px', color: '#b04e6f', fontFamily: '"Baloo 2", cursive' }}>
                  {isEditing ? '✏️ Editar Devolución' : '✨ Nueva Devolución'}
                </Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                  <TextField
                    label="Detalle de Devolución"
                    name="detalleDevolucion"
                    value={devolucion.detalleDevolucion}
                    onChange={(e) => setDevolucion({ ...devolucion, detalleDevolucion: e.target.value })}
                    fullWidth margin="normal" required variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&.Mui-focused fieldset': { borderColor: '#f48fb1' } }, '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#f48fb1' } } }}
                  />
                  <TextField
                    label="Inventarios (catálogo)"
                    name="inventarios"
                    value={devolucion.inventarios.join(',')}
                    onChange={(e) => setDevolucion({ ...devolucion, inventarios: e.target.value.split(',') })}
                    fullWidth margin="normal" required variant="outlined" placeholder="Separar valores con coma"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&.Mui-focused fieldset': { borderColor: '#f48fb1' } }, '& .MuiInputLabel-root': { '&.Mui-focused': { color: '#f48fb1' } } }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                    <Button type="submit" variant="contained" startIcon={isEditing ? <Edit /> : <Add />} sx={{ borderRadius: '12px', backgroundColor: '#f48fb1', '&:hover': { backgroundColor: '#ec7096' }, textTransform: 'none', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(244,143,177,0.3)' }}>
                      {isEditing ? 'Actualizar' : 'Crear'}
                    </Button>
                    {isEditing && (
                      <Button variant="outlined" onClick={resetForm} startIcon={<Delete />} sx={{ borderRadius: '12px', borderColor: '#f48fb1', color: '#f48fb1', '&:hover': { borderColor: '#ec7096', backgroundColor: 'rgba(244,143,177,0.08)' }, textTransform: 'none', fontWeight: 'bold' }}>
                        Cancelar
                      </Button>
                    )}
                  </Box>
                </form>
              </Paper>
    
              <Paper elevation={2} sx={{ padding: '20px', borderRadius: '20px', backgroundColor: '#fff0f5', position: 'relative', overflow: 'hidden', border: '1px solid #f8c8dc', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)' } }}>
                <Typography variant="h6" sx={{ marginBottom: '15px', color: '#b04e6f', fontFamily: '"Baloo 2", cursive', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ListAlt fontSize="small" /> Lista de Devoluciones
                </Typography>
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: '15px', overflow: 'hidden', border: '1px solid #f8c8dc', overflowX: 'auto' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          <Box display="flex" alignItems="center" onClick={() => handleSort('detalleDevolucion')}>
                            Detalle de Devolución
                            {sortBy === 'detalleDevolucion' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Inventarios</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedDevoluciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => (
                        <TableRow key={d._id} sx={{ '&:hover': { backgroundColor: '#fff0f5' } }}>
                          <TableCell>{d.detalleDevolucion}</TableCell>
                          <TableCell>{d.inventarios.join(', ')}</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => { setDevolucion(d); setIsEditing(true); setCurrentId(d._id); }} sx={{ color: '#4caf50', '&:hover': { backgroundColor: 'rgba(76,175,80,0.1)' } }}><Edit /></IconButton>
                            <IconButton onClick={() => { setCurrentId(d._id); setOpenDeleteDialog(true); }} sx={{ color: '#e57373', '&:hover': { backgroundColor: 'rgba(229,115,115,0.1)' } }}><Delete /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[5,10,25]} component="div" count={devoluciones.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} sx={{ color: '#b04e6f', '& .MuiTablePagination-selectIcon': { color: '#f48fb1' } }} />
              </Paper>
    
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success" onClose={() => setOpenSnackbar(false)} sx={{ fontFamily: '"Baloo 2", cursive' }}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
    
              <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} PaperProps={{ sx: { borderRadius: '20px', backgroundColor: '#fff5f7', border: '1px solid #f8c8dc' } }}>
                <DialogTitle sx={{ fontFamily: '"Baloo 2", cursive', color: '#b04e6f' }}>Eliminar Devolución</DialogTitle>
                <DialogContent>
                  <DialogContentText sx={{ fontFamily: '"Baloo 2", cursive' }}>¿Estás seguro de que deseas eliminar esta devolución?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#ffeef3', borderTop: '1px solid #f8c8dc' }}>
                  <Button onClick={() => setOpenDeleteDialog(false)} sx={{ color: '#f48fb1', fontWeight: 'bold' }}>Cancelar</Button>
                  <Button color="error" onClick={handleDelete} sx={{ fontWeight: 'bold' }}>Eliminar</Button>
                </DialogActions>
              </Dialog>
            </Container>
          </Box>
        </Box>
      );
    };
    
    export default Devoluciones;
    