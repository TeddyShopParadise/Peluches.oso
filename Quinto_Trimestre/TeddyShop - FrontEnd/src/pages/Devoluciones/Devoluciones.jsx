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

    const getAuthToken = () => {
        const token = localStorage.getItem('authToken');
        return token;
      };
      const token = getAuthToken();

    const fetchDevoluciones = async () => {
        try {
            const response = await fetch(`${apiUrl}/devoluciones`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Agrega el token aquí
                },
            });
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
                headers: { 'Content-Type': 'application/json', 
                           'Authorization': `Bearer ${token}`, },

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
            await fetch(`${apiUrl}/devoluciones/${currentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
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
                    maxWidth: '100%',
                    padding: '50px',
                    borderRadius: '30px',
                }}
            >
                <Container>
                    <h1>Devoluciones</h1>
                    <TextField
                        label="Detalle de Devolución"
                        value={devolucion.detalleDevolucion}
                        onChange={(e) => setDevolucion({ ...devolucion, detalleDevolucion: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Inventarios (catálogo)"
                        value={devolucion.inventarios}
                        onChange={(e) => setDevolucion({ ...devolucion, inventarios: e.target.value.split(',') })}
                        fullWidth
                        margin="normal"
                        placeholder="Separar valores con coma"
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="contained" onClick={handleSubmit}>
                            {isEditing ? 'Actualizar' : 'Crear'}
                        </Button>
                        {isEditing && (
                            <Button variant="outlined" onClick={resetForm}>
                                Cancelar
                            </Button>
                        )}
                    </Box>
                    <TableContainer component={Paper} style={{ marginTop: 20 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" onClick={() => handleSort('detalleDevolucion')}>
                                            Detalle de Devolución
                                            {sortBy === 'detalleDevolucion' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                                        </Box>
                                    </TableCell>
                                    <TableCell>Inventarios</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedDevoluciones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((devolucion) => (
                                    <TableRow key={devolucion._id}>
                                        <TableCell>{devolucion.detalleDevolucion}</TableCell>
                                        <TableCell>{devolucion.inventarios.join(', ')}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEditClick(devolucion)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => {
                                                setCurrentId(devolucion._id);
                                                setOpenDeleteDialog(true);
                                            }}>
                                                <Delete />
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
                        count={filteredDevoluciones.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                        <DialogTitle>Eliminar Devolución</DialogTitle>
                        <DialogContent>
                            <DialogContentText>¿Estás seguro de que deseas eliminar esta devolución?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
                            <Button color="error" onClick={handleDelete}>Eliminar</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
        </Box>
    );
};

export default Devoluciones;
