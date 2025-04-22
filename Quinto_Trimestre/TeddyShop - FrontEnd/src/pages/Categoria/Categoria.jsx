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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Swal from 'sweetalert2';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
import useApiRequest from '../../hooks/useApiRequest';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
};
const token = getAuthToken();


const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategoria, setSelectedCategoria] = useState(null);


  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const { makeRequest } = useApiRequest();

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`);
      if (!response.ok) throw new Error('Error al obtener las categorías');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setEditingId(null);
  };

  const crearCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      return Swal.fire('Campos incompletos', 'Completa todos los campos.', 'warning');
    }

    await makeRequest({
      url: `${apiUrl}/categorias`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  // Aquí agregas el token
      },
      data: { nombreCategoria, descripcionCategoria },
      confirm: {
        title: 'Crear categoría',
        text: '¿Deseas crear esta categoría?',
      },
      loading: {
        title: 'Creando categoría...',
        html: 'Procesando solicitud',
      },
      success: {
        title: '¡Categoría creada!',
        text: 'La categoría se ha guardado correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
        resetForm();
      },
    });
  };

  const actualizarCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria) {
      return Swal.fire('Campos incompletos', 'Completa todos los campos.', 'warning');
    }

    await makeRequest({
      url: `${apiUrl}/categorias/${editingId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,  // Aquí agregas el token
      },
      data: { nombreCategoria, descripcionCategoria },
      confirm: {
        title: 'Actualizar categoría',
        text: '¿Deseas actualizar esta categoría?',
      },
      loading: {
        title: 'Actualizando...',
        html: 'Estamos actualizando la categoría.',
      },
      success: {
        title: '¡Categoría actualizada!',
        text: 'Se actualizó correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
        resetForm();
      },
      error: {
        title: 'Error al actualizar',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>',
      },
    });
  };

  const eliminarCategoria = async (id) => {
    await makeRequest({
      url: `${apiUrl}/categorias/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,  // Aquí agregas el token
      },
      confirm: {
        title: '¿Eliminar categoría?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      },
      loading: {
        title: 'Eliminando...',
        html: 'Estamos eliminando la categoría.',
      },
      success: {
        title: '¡Categoría eliminada!',
        text: 'La categoría ha sido eliminada correctamente.',
      },
      onSuccess: () => {
        fetchCategorias();
      },
      error: {
        title: 'Error al eliminar',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>',
      },
    });
  };

  const editarCategoria = (categoria) => {
    setEditingId(categoria._id);
    setNombreCategoria(categoria.nombreCategoria);
    setDescripcionCategoria(categoria.descripcionCategoria);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const openDetailsDialog = (categoria) => {
    setSelectedCategoria(categoria);
  };

  const closeDetailsDialog = () => {
    setSelectedCategoria(null);
  };

  useEffect(() => {
    fetchCategorias();
    fetchProductos();
  }, []);

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
          <h1>Gestión de Categorías</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? actualizarCategoria() : crearCategoria();
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              placeholder="Nombre de la categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Nombre de la categoría"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              placeholder="Descripción de la categoría"
              value={descripcionCategoria}
              onChange={(e) => setDescripcionCategoria(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Descripción de la categoría"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />

           <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2  }}>
             {!editingId ? (
           <Button
           variant="contained"
           color="primary"
           onClick={crearCategoria}
         >
          Crear Usuario
          </Button>
       ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={actualizarCategoria}
        >
          Actualizar Usuario
        </Button>
      )}
          <Button variant="outlined" color="secondary" onClick={resetForm}>
            Cancelar
          </Button>

        </Box>       
         </form>

          <Box mt={4}>
            <h2>Lista de Categorías</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((categoria) => (
                    <TableRow key={categoria._id}>
                      <TableCell>{categoria.nombreCategoria}</TableCell>
                      <TableCell>{categoria.descripcionCategoria}</TableCell>
                      <TableCell>
                        <IconButton 
                        color='primary'onClick={() => editarCategoria(categoria)}>
                          <Edit />
                        </IconButton>
                        <IconButton   sx={{ color: "#d33" }}onClick={() => eliminarCategoria(categoria._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categorias.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};


export default CategoriaComponent;
