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
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info, Receipt as ReceiptIcon } from '@mui/icons-material';
import '../PagesStyle.css'
import { getApiUrl } from '../../utils/apiConfig'
import FacturaPDF from '../Factura/FacturaPDF';
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Pedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    nombreComprador: '',
    numeroComprador: '',
    nombreAgendador: '',
    numeroAgendador: '',
    localidad: '',
    direccion: '',
    barrio: '',
    cliente: '',
    detallesPedido: [],
    facturas: []
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
  const [facturaDialogOpen, setFacturaDialogOpen] = useState(false);
  const [facturaGenerada, setFacturaGenerada] = useState(null);
  const [compania, setCompania] = useState([]);

  
  useEffect(() => {
    fetchPedidos();
    fetchCompania(); 
  }, []);


  const fetchCompania = async () => {
    try {
      const response = await fetch(`${apiUrl}/compania`);
      const data = await response.json();
      setCompania(data[0] || {});
    } catch (error) {
      console.error('Error obteniendo datos de compañía:', error);
    }
  };



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
        nombreComprador: '',
        numeroComprador: '',
        nombreAgendador: '',
        numeroAgendador: '',
        localidad: '',
        direccion: '',
        barrio: '',
        cliente: '',
        detallesPedido: [],
        facturas: [],
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

  
  const handleEstadoChange = async (pedidoId, nuevoEstado) => {
    try {
      const response = await fetch(`${apiUrl}/pedido/estado/${pedidoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el estado');
      }
  
      const actualizado = await response.json();
      setPedidos(prev =>
        prev.map(p => (p._id === pedidoId ? actualizado : p))
      );
      setSnackbarMessage('Estado actualizado con éxito');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      setSnackbarMessage('Error al actualizar el estado: ' + error.message);
      setOpenSnackbar(true);
    }
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

  
  
  const handleGenerarFactura = async (pedidoId) => {
    try {
      const pedidoSeleccionado = pedidos.find(p => p._id === pedidoId);
      setSelectedPedido(pedidoSeleccionado);
  
      const response = await fetch(`${apiUrl}/factura/generar/${pedidoId}`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al generar factura");
      }
  
      const facturaData = await response.json();
      const facturaCompleta = await fetch(`${apiUrl}/factura/${facturaData._id}?populate=detallesFactura`);
      const facturaPoblada = await facturaCompleta.json();
      
      setFacturaGenerada(facturaPoblada);
      setFacturaDialogOpen(true); 
      
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage(error.message);
      setOpenSnackbar(true);
    }
  };
  


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
          <h1>Gestión de Pedidos</h1>
          <Box mb={4}>
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
                    <Box display="flex" alignItems="center" onClick={() => handleSort('tamañoOso')}>
                      Tamaño del Oso
                      {sortBy === 'tamañoOso' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort('estado')}>
                      Estado
                      {sortBy === 'estado' && (sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedPedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pedido) => (
                  <TableRow key={pedido._id}>
                    <TableCell>{pedido.nombreComprador}</TableCell>
                    <TableCell>
        {pedido.detallesPedido.map(detalle => (
  <div key={detalle._id}>
     {detalle.idProducto?.tamañoProducto}
  </div>
))
}
      </TableCell>
                    <TableCell>
                     <FormControl fullWidth size="small">
                     <Select
                        value={pedido.estado || 'en_proceso'}
                        onChange={(e) => handleEstadoChange(pedido._id, e.target.value)}
                      >
                        <MenuItem value="pendiente">Cancelado</MenuItem>
                        <MenuItem value="en_proceso">En proceso</MenuItem>
                        <MenuItem value="realizado">Realizado</MenuItem>
                      </Select>
                     </FormControl>
                    </TableCell>
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
                      <Button 
                        variant="contained" 
                        color="success"
                        disabled={pedido.estado !== 'realizado'}
                        onClick={() => handleGenerarFactura(pedido._id)}
                        startIcon={<ReceiptIcon />}
                        sx={{
                          ml: 1,
                          textTransform: 'none',
                          borderRadius: '8px',
                          '&:disabled': { 
                            backgroundColor: '#e0e0e0',
                            color: '#9e9e9e'
                          }
                        }}
                      >
                        Generar Factura
                      </Button>
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
                  <strong>Numero del Comprador:</strong> {selectedPedido.numeroComprador}<br /> <br />
                  <strong>Nombre del Agendador:</strong> {selectedPedido.nombreAgendador} <br />
                  <strong>Numero del Agendador:</strong> {selectedPedido.numeroAgendador} <br /> <br />
                  <strong>Localidad:</strong> {selectedPedido.localidad} <br />
                  <strong>Dirección:</strong> {selectedPedido.direccion} <br />
                  <strong>Barrio:</strong> {selectedPedido.barrio } <br />
                </DialogContentText>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetailDialog(false)}>Cerrar</Button>
            </DialogActions>
          </Dialog>
          {facturaGenerada && selectedPedido && (
            <FacturaPDF 
              factura={facturaGenerada}
              pedido={selectedPedido} 
              compania={compania}
              open={facturaDialogOpen}
              onClose={() => setFacturaDialogOpen(false)}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Pedido;