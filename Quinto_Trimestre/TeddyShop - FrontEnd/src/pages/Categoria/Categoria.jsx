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
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);


const CategoriaComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcionCategoria, setDescripcionCategoria] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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

  const crearCategoria = async () => {
    if (!nombreCategoria || !descripcionCategoria ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCategoria,
          descripcionCategoria
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarCategoria = async () => {
    if (!editingId || !nombreCategoria || !descripcionCategoria) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Extraer solo los _id de los productos seleccionados si es necesario
    const productosIds = productosSeleccionados.map(producto => producto._id || producto);

    try {
      const response = await fetch(`${apiUrl}/categorias/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCategoria,
          descripcionCategoria
       
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      console.log('Categoría actualizada', await response.json());
      fetchCategorias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        const response = await fetch(`${apiUrl}/categorias/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la categoría');
        }

        fetchCategorias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const editarCategoria = (categoria) => {
    setEditingId(categoria._id); // Establece el ID de la categoría que se está editando
    setNombreCategoria(categoria.nombreCategoria);
    setDescripcionCategoria(categoria.descripcionCategoria);
   
  };

  const resetForm = () => {
    setNombreCategoria('');
    setDescripcionCategoria('');
    setEditingId(null);
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
                        <IconButton onClick={() => editarCategoria(categoria)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarCategoria(categoria._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => openDetailsDialog(categoria)}>
                          <Info />
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

      {selectedCategoria && (
        <Dialog open={true} onClose={closeDetailsDialog}>
          <DialogTitle>Detalles de la Categoría</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Nombre:</strong> {selectedCategoria.nombreCategoria}
            </DialogContentText>
            <DialogContentText>
              <strong>Descripción:</strong> {selectedCategoria.descripcionCategoria}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetailsDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CategoriaComponent;
