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
import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const CatalogoComponent = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [companias, setCompanias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [estiloCatalogo, setEstiloCatalogo] = useState('');
  const [companiaSeleccionada, setCompaniaSeleccionada] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [vendedoresSeleccionados, setVendedoresSeleccionados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCatalogo, setSelectedCatalogo] = useState(null);

  const fetchCatalogos = async () => {
    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`);
      if (!response.ok) {
        throw new Error('Error al obtener los catálogos');
      }
      const data = await response.json();
      setCatalogos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchCompanias = async () => {
    try {
      const response = await fetch(`${apiUrl}/Compania`);
      if (!response.ok) {
        throw new Error('Error al obtener las compañías');
      }
      const data = await response.json();
      setCompanias(data);
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

  const fetchVendedores = async () => {
    try {
      const response = await fetch(`${apiUrl}/vendedor`);
      if (!response.ok) {
        throw new Error('Error al obtener los vendedores');
      }
      const data = await response.json();
      setVendedores(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const crearCatalogo = async () => {
    if (!nombreCatalogo || !estiloCatalogo || !companiaSeleccionada || productosSeleccionados.length === 0 || vendedoresSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCatalogo,
          descripcionCatalogo,
          disponibilidadCatalogo,
          estiloCatalogo,
          compania: companiaSeleccionada,
          productos: productosSeleccionados,
          vendedoresCatalogo: vendedoresSeleccionados,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el catálogo');
      }

      fetchCatalogos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarCatalogo = async () => {
    if (!editingId || !nombreCatalogo || !estiloCatalogo || !companiaSeleccionada || productosSeleccionados.length === 0 || vendedoresSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/catalogos/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCatalogo,
          descripcionCatalogo,
          disponibilidadCatalogo,
          estiloCatalogo,
          compania: companiaSeleccionada,
          productos: productosSeleccionados,
          vendedoresCatalogo: vendedoresSeleccionados,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el catálogo');
      }

      fetchCatalogos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const eliminarCatalogo = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este catálogo?')) {
      try {
        const response = await fetch(`${apiUrl}/catalogos/activos${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el catálogo');
        }

        fetchCatalogos();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const editarCatalogo = (catalogo) => {
    setEditingId(catalogo._id); 
    setNombreCatalogo(catalogo.nombreCatalogo);
    setDescripcionCatalogo(catalogo.descripcionCatalogo || '');
    setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
    setEstiloCatalogo(catalogo.estiloCatalogo);
    setCompaniaSeleccionada(catalogo.compania );
    setProductosSeleccionados(catalogo.productos || []);
    setVendedoresSeleccionados(catalogo.vendedoresCatalogo || []);
  };

  const resetForm = () => {
    setNombreCatalogo('');
    setDescripcionCatalogo('');
    setDisponibilidadCatalogo(true);
    setEstiloCatalogo('');
    setCompaniaSeleccionada('');
    setProductosSeleccionados([]);
    setVendedoresSeleccionados([]);
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const openDetailsDialog = (catalogo) => {
    setSelectedCatalogo(catalogo);
  };

  const closeDetailsDialog = () => {
    setSelectedCatalogo(null);
  };

  useEffect(() => {
    fetchCatalogos();
    fetchCompanias();
    fetchProductos();
    fetchVendedores();
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
          <h1>Gestión de Catálogos</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingId ? actualizarCatalogo() : crearCatalogo();
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="text"
              placeholder="Nombre del catálogo"
              value={nombreCatalogo}
              onChange={(e) => setNombreCatalogo(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Nombre del catálogo"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              placeholder="Descripción del catálogo"
              value={descripcionCatalogo}
              onChange={(e) => setDescripcionCatalogo(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              label="Descripción del catálogo"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              placeholder="Estilo del catálogo"
              value={estiloCatalogo}
              onChange={(e) => setEstiloCatalogo(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              label="Estilo del catálogo"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Compañía</InputLabel>
              <Select
                value={companiaSeleccionada}
                onChange={(e) => setCompaniaSeleccionada(e.target.value)}
                label="Compañía"
              >
                {companias.map((comp) => (
                  <MenuItem key={comp._id} value={comp._id}>
                    {comp.nombreEmpresa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Productos</InputLabel>
              <Select
                multiple
                value={productosSeleccionados}
                onChange={(e) => setProductosSeleccionados(e.target.value)}
                label="Productos"
              >
                {productos.map((prod) => (
                  <MenuItem key={prod._id} value={prod._id}>
                    {prod.estiloProducto} - {prod.tamañoProducto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" required>
              <InputLabel>Vendedores</InputLabel>
              <Select
                multiple
                value={vendedoresSeleccionados}
                onChange={(e) => setVendedoresSeleccionados(e.target.value)}
                label="Vendedores"
              >
                {vendedores.map((vend) => (
                  <MenuItem key={vend._id} value={vend._id}>
                    {vend.codigoVendedor} - {vend.dniEmpleado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            <h2>Lista de Catálogos</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Estilo</TableCell>
                    <TableCell>Compañía</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {catalogos.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage).map((catalogo) => (
                    <TableRow key={catalogo._id}>
                      <TableCell>{catalogo.nombreCatalogo}</TableCell>
                      <TableCell>{catalogo.estiloCatalogo}</TableCell>
                      <TableCell>{catalogo.compania.nombreEmpresa}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => editarCatalogo(catalogo)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarCatalogo(catalogo._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => openDetailsDialog(catalogo)}>
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
                count={catalogos.length}
                rowsPerPage={rowsPerPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
        </Container>
      </Box>

      {selectedCatalogo && (
        <Dialog open={true} onClose={closeDetailsDialog}>
          <DialogTitle>Detalles del Catálogo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Nombre:</strong> {selectedCatalogo.nombreCatalogo}
            </DialogContentText>
            <DialogContentText>
              <strong>Estilo:</strong> {selectedCatalogo.estiloCatalogo}
            </DialogContentText>
            <DialogContentText>
              <strong>Compañías:</strong> {selectedCatalogo.compania}
            </DialogContentText>
            <DialogContentText>
              <strong>Productos:</strong> {selectedCatalogo.productos}
            </DialogContentText>
            <DialogContentText>
              <strong>Descripción:</strong> {selectedCatalogo.descripcionCatalogo}
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

export default CatalogoComponent;
