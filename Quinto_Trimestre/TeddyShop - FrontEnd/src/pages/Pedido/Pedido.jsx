import React, { useEffect, useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import '../PagesStyle.css'
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    tamañoOso: '',
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
    apellidoAgendador: '',
    apellidoComprador: '',
    detallesPedido: [],
    facturas: [],
    vendedores: []
  });
  const [pedidoEdicion, setPedidoEdicion] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('nombreComprador');
  const [sortOrder, setSortOrder] = useState('asc');

  
  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await fetch(`${apiUrl}/pedido`);
      if (!response.ok) throw new Error('Error al obtener los pedidos');
      const data = await response.json();
      setPedidos(data); 
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  const crearPedido = async () => {
    try {
      const response = await fetch(`${apiUrl}/pedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPedido),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const newPedido = await response.json();
      setPedidos([...pedidos, newPedido]);
      setSnackbarMessage('Pedido creado con éxito');
      setOpenSnackbar(true);
      setNuevoPedido({
        tamañoOso: '',
        nombreComprador: '',
        numeroComprador: '',
        nombreAgendador: '',
        numeroAgendador: '',
        localidad: '',
        direccion: '',
        barrio: '',
        cliente: '',
        apellidoAgendador: '',
        apellidoComprador: '',
        detallesPedido: [],
        facturas: [],
        vendedores: []
      });
      
    } catch (error) {
      console.error('Error creando pedido:', error);
      setSnackbarMessage('Error al crear el pedido: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const actualizarPedido = async () => {
  if (!pedidoEdicion) return;

  const { _id, ...pedidoActualizar } = pedidoEdicion;
  console.log("Datos enviados para actualizar:", pedidoActualizar); // Debug

  try {
    const response = await fetch(`${apiUrl}/pedido/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoActualizar),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de validación en el servidor:", errorData);
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const updatedPedido = await response.json();
    setPedidos(
      pedidos.map((pedido) =>
        pedido._id === updatedPedido._id ? updatedPedido : pedido
      )
    );
    setSnackbarMessage('Pedido actualizado con éxito');
    setOpenSnackbar(true);
    setPedidoEdicion(null);
  } catch (error) {
    console.error('Error actualizando el pedido:', error);
    setSnackbarMessage('Error al actualizar el pedido: ' + error.message);
    setOpenSnackbar(true);
  }
};

  const eliminarPedido = async () => {
    if (!currentId) return;

    try {
      await fetch(`${apiUrl}/pedido/${currentId}`, {
        method: 'DELETE',
      });
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido._id !== currentId));
      setSnackbarMessage('Pedido eliminado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error eliminando el pedido:', error);
      setSnackbarMessage('Error al eliminar el pedido');
      setOpenSnackbar(true);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPedido((prev) => ({ ...prev, [name]: value }));
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

  const handleEditClick = (pedido) => {
    setPedidoEdicion(pedido);
  };

  const handleDetailClick = (pedido) => {
    setSelectedPedido(pedido);
    setOpenDetailDialog(true);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const filteredPedidos = pedidos.filter((pedido) =>
    pedido.nombreComprador && pedido.nombreComprador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPedidos = [...filteredPedidos].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Box
      sx={{
        height: 'auto',
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
          padding: '50px',
          background: 'linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          animation: 'shimmer 10s infinite linear',
        }}
      >
        <Container>
          <h1>Gestión de Pedidos</h1>
          <Box mb={4}>
            <TextField
              label="Tamaño del Oso"
              name="tamañoOso"
              value={nuevoPedido.tamañoOso}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nombre del Comprador"
              name="nombreComprador"
              value={nuevoPedido.nombreComprador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellido del Comprador"
              name="apellidoComprador"
              value={nuevoPedido.apellidoComprador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Numero del Comprador"
              name="numeroComprador"
              value={nuevoPedido.numeroComprador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nombre del Agendador"
              name="nombreAgendador"
              value={nuevoPedido.nombreAgendador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellido del Agendador"
              name="apellidoAgendador"
              value={nuevoPedido.apellidoAgendador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Numero del Agendador"
              name="numeroAgendador"
              value={nuevoPedido.numeroAgendador}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Localidad"
              name="localidad"
              value={nuevoPedido.localidad}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Dirección"
              name="direccion"
              value={nuevoPedido.direccion}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Barrio"
              name="barrio"
              value={nuevoPedido.barrio}
              onChange={(e) => handleChange(e)}
              fullWidth
              margin="normal"
            />
            {/* Agregar más campos según sea necesario */}
            {pedidoEdicion ? (
              <Button variant="contained" onClick={actualizarPedido}>
                Actualizar
              </Button>
            ) : (
              <Button variant="contained" onClick={crearPedido}>
                Crear
              </Button>
            )}
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Lista de Pedidos</h2>
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
                    <Box display="flex" alignItems="center" onClick={() => handleSort('nombreComprador')}>
                      Nombre del Comprador
                      {sortBy === 'nombreComprador' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('apellidoComprador')}>
                      Apellido del Comprador
                      {sortBy === 'apellidoComprador' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('tamañoOso')}>
                      Tamaño del Oso
                      {sortBy === 'tamañoOso' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('direccion')}>
                      Direccón
                      {sortBy === 'direccion' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pedido) => (
                  <TableRow key={pedido._id}>
                    <TableCell>{pedido.nombreComprador}</TableCell>
                    <TableCell>{pedido.apellidoComprador}</TableCell>
                    <TableCell>{pedido.tamañoOso}</TableCell>
                    <TableCell>{pedido.direccion}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditClick(pedido)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => {
                        setCurrentId(pedido._id);
                        setOpenDeleteDialog(true);
                      }}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleDetailClick(pedido)}>
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
            count={sortedPedidos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>

          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Eliminar Pedido</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que deseas eliminar este pedido?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={eliminarPedido} color="primary">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Diálogo de detalles */}
          <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)}>
            <DialogTitle>Detalles de Pedidos</DialogTitle>
            <DialogContent>
              {selectedPedido && (
                <DialogContentText>
                  <strong>Nombre del Comprador:</strong> {selectedPedido.nombreComprador} <br />
                  <strong>Apellido del Comprador:</strong> {selectedPedido.apellidoComprador} <br />
                  <strong>Numero del Comprador:</strong> {selectedPedido.numeroComprador}<br /> <br />
                  <strong>Nombre del Agendador:</strong> {selectedPedido.nombreAgendador} <br />
                  <strong>Apellido del Agendador:</strong> {selectedPedido.apellidoAgendador} <br />
                  <strong>Numero del Agendador:</strong> {selectedPedido.numeroAgendador} <br /> <br />
                  <strong>Localidad:</strong> {selectedPedido.localidad} <br />
                  <strong>Dirección:</strong> {selectedPedido.direccion} <br />
                  <strong>Barrio:</strong> {selectedPedido.barrio } <br />
                  <strong>Cliente:</strong> {selectedPedido.cliente} <br />
                  <strong>Detalles del Pedido:</strong> {selectedPedido.detallesPedido } <br />
                  <strong>Facturas:</strong> {selectedPedido.facturas } <br />
                  <strong>Vendedores:</strong> {selectedPedido.vendedores } <br />
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

export default Pedido;
