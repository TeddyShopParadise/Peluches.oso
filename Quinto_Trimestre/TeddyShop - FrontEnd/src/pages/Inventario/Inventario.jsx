import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import { getApiUrl } from '../../utils/apiConfig'
import '../PagesStyle.css';

const apiUrl = getApiUrl();

console.log("Url almacenada: ",apiUrl);

const Inventario = () => {
  const [inventarios, setInventarios] = useState([]);
  const [nuevoInventario, setNuevoInventario] = useState({
    stockMinimo: 0,
    precioVenta: 0,
    precioCompra: 0,
    stock: 0,
    stockMaximo: 0,
    productoIdProducto: '',
  });
  const [selectedInventario, setSelectedInventario] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // Estado para el modal de detalles
  const [snackOpen, setSnackOpen] = useState(false); // Estado para el Snackbar

  useEffect(() => {
    console.log('Fetching inventarios...');
    fetchInventarios();
  }, []);
  
  const fetchInventarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventario`);
      if (!response.ok) throw new Error('Error al obtener los inventarios');
      const data = await response.json();
      console.log('Inventarios cargados:', data);  // Verifica los datos
      setInventarios(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const crearInventario = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoInventario),
      });
      if (!response.ok) throw new Error('Error al crear el inventario');
      fetchInventarios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const actualizarInventario = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/inventario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedInventario),
      });
      if (!response.ok) throw new Error('Error al actualizar el inventario');
      fetchInventarios();
      setSelectedInventario(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminarInventario = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/inventario/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el inventario');
      fetchInventarios();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOpenDialog = (inventario) => {
    setSelectedInventario(inventario);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInventario(null);
  };

  useEffect(() => {
    fetchInventarios();
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
          <h1>Inventario</h1>

          <h2>Crear Inventario</h2>
          <TextField
            type="number"
            label="Stock Mínimo"
            value={nuevoInventario.stockMinimo}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMinimo: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <TextField
            type="number"
            label="Precio Venta"
            value={nuevoInventario.precioVenta}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioVenta: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <TextField
            type="number"
            label="Precio Compra"
            value={nuevoInventario.precioCompra}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, precioCompra: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <TextField
            type="number"
            label="Stock"
            value={nuevoInventario.stock}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, stock: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <TextField
            type="number"
            label="Stock Máximo"
            value={nuevoInventario.stockMaximo}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, stockMaximo: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <TextField
            type="text"
            label="ID Producto"
            value={nuevoInventario.productoIdProducto}
            onChange={(e) => setNuevoInventario({ ...nuevoInventario, productoIdProducto: e.target.value })}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { fontSize: '1.2rem' },
              '& .MuiInputBase-input': { fontSize: '1.2rem' },
            }}
          />
          <Button variant="contained" onClick={crearInventario} sx={{ marginTop: 2, fontSize: '1.2rem' }}>
            Crear Inventario
          </Button>

          <h2>Lista de Inventarios</h2>
          <Box mt={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Stock Mínimo</TableCell>
                    <TableCell align="center">Precio Venta</TableCell>
                    <TableCell align="center">Precio Compra</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Stock Máximo</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventarios.map((inventario) => (
                    <TableRow key={inventario.idInventario}>
                      <TableCell align="center">{inventario.idInventario}</TableCell>
                      <TableCell align="center">{inventario.stockMinimo}</TableCell>
                      <TableCell align="center">{inventario.precioVenta.$numberDecimal}</TableCell>
                      <TableCell align="center">{inventario.precioCompra.$numberDecimal}</TableCell>
                      <TableCell align="center">{inventario.stock}</TableCell>
                      <TableCell align="center">{inventario.stockMaximo}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => setSelectedInventario(inventario)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarInventario(inventario.idInventario)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDialog(inventario)}>
                          <Info />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {selectedInventario && (
            <Box mt={4}>
              <h2>Actualizar Inventario</h2>
              <TextField
                type="number"
                label="Stock Mínimo"
                value={selectedInventario.stockMinimo}
                onChange={(e) => setSelectedInventario({ ...selectedInventario, stockMinimo: e.target.value })}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              {/* Otros campos para actualizar inventario */}
              <Button
                variant="contained"
                onClick={() => actualizarInventario(selectedInventario.idInventario)}
                sx={{ marginRight: 2 }}
              >
                Actualizar Inventario
              </Button>
              <Button variant="outlined" onClick={() => setSelectedInventario(null)}>
                Cancelar
              </Button>
            </Box>
          )}

          {/* Dialog for Info */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Detalles del Inventario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>ID Producto:</strong> {selectedInventario?.productoIdProducto}<br />
                <strong>Stock Mínimo:</strong> {selectedInventario?.stockMinimo}<br />
                <strong>Precio Venta:</strong> {selectedInventario?.precioVenta.$numberDecimal}<br />
                <strong>Precio Compra:</strong> {selectedInventario?.precioCompra.$numberDecimal}<br />
                <strong>Stock:</strong> {selectedInventario?.stock}<br />
                <strong>Stock Máximo:</strong> {selectedInventario?.stockMaximo}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default Inventario;
