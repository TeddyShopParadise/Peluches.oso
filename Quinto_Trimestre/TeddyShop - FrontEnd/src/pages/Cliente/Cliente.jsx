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
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
};
const token = getAuthToken();

export default function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    dniCliente: '',
    nombreCliente: '',
    telefonoCliente: '',
    fechaNacimientoCliente: '',
    apellidoCliente: '',
  });
  const [pedidos, setPedidos] = useState([]); // Estado para manejar los pedidos
  const [facturas, setFacturas] = useState([]); // Estado para manejar las facturas
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedCliente, setSelectedCliente] = useState(null);

  // Función para listar clientes
  const listarClientes = async () => {
    try {
      const response = await fetch(`${apiUrl}/clientes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agrega el token aquí
        },
      });
      if (!response.ok) throw new Error('Error al obtener los clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Llama a listarClientes al montar el componente
  useEffect(() => {
    listarClientes();
  }, []);

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Funciones para manejar los pedidos
  const addPedido = () => setPedidos([...pedidos, ""]);
  const handlePedidoChange = (index, value) => {
    const newPedidos = [...pedidos];
    newPedidos[index] = value;
    setPedidos(newPedidos);
  };
  const removePedido = (index) => {
    const newPedidos = pedidos.filter((_, i) => i !== index);
    setPedidos(newPedidos);
  };

  // Funciones para manejar las facturas
  const addFactura = () => setFacturas([...facturas, ""]);
  const handleFacturaChange = (index, value) => {
    const newFacturas = [...facturas];
    newFacturas[index] = value;
    setFacturas(newFacturas);
  };
  const removeFactura = (index) => {
    const newFacturas = facturas.filter((_, i) => i !== index);
    setFacturas(newFacturas);
  };

  // Función para crear o actualizar un cliente
// ...
const handleSubmit = async (e) => {
  e.preventDefault();

  // Crea una copia del formData sin fechaNacimientoCliente
  const { fechaNacimientoCliente, ...dataToSend } = formData;

  console.log("Datos enviados:", { ...dataToSend, pedidos, facturas });

  try {
    const url = selectedClientId
      ? `${apiUrl}/clientes/${selectedClientId}`
      : `${apiUrl}/clientes`;
    const method = selectedClientId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...dataToSend, pedidos, facturas }),
    });

    // Procesamiento de la respuesta
    if (response.ok) {
      await listarClientes();
      setFormData({
        dniCliente: '',
        nombreCliente: '',
        telefonoCliente: '',
        fechaNacimientoCliente: '',
        apellidoCliente: '',
      });
      setPedidos([]);
      setFacturas([]);
      setSelectedClientId(null);
      setSuccessMessage(`Cliente ${selectedClientId ? 'actualizado' : 'creado'} exitosamente!`);
      setError('');
    } else {
      const errorResponse = await response.json();
      console.log("Error en la respuesta del servidor:", errorResponse);
      setError(errorResponse.message || 'Error en los datos enviados.');
      setSuccessMessage('');
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    setError('Error en la solicitud');
  }
};

// ...

  // Función para seleccionar un cliente para actualizar
  const handleEdit = (cliente) => {
    setSelectedClientId(cliente._id);
    setFormData({
      dniCliente: cliente.dniCliente,
      nombreCliente: cliente.nombreCliente,
      telefonoCliente: cliente.telefonoCliente,
      fechaNacimientoCliente: cliente.fechaNacimientoCliente.split('T')[0], // Formato de fecha YYYY-MM-DD
      apellidoCliente: cliente.apellidoCliente,
    });
    setPedidos(cliente.pedidos || []); // Cargar los pedidos asociados
    setFacturas(cliente.facturas || []); // Cargar las facturas asociadas
  };

  // Función para eliminar un cliente
  const eliminarCliente = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        const response = await fetch(`${apiUrl}/clientes/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          await listarClientes(); // Refresca la lista después de eliminar un cliente
          setSuccessMessage('Cliente eliminado exitosamente!');
          setError(''); // Limpia el mensaje de error
        } else {
          const errorResponse = await response.json();
          setError(errorResponse.message || 'Error al eliminar el cliente.');
          setSuccessMessage(''); // Limpia el mensaje de éxito
        }
      } catch (error) {
        console.error(error);
        setError('Error en la solicitud');
      }
    }
  };

  // Función para manejar la paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para manejar el cambio de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para mostrar los detalles del cliente
  const handleShowDetails = (cliente) => {
    setSelectedCliente(cliente);
  };

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
          {/* Formulario de Crear o Editar Cliente */}
          <h2>{selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}</h2>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="number"
              name="dniCliente"
              label="DNI del Cliente"
              value={formData.dniCliente}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              name="nombreCliente"
              label="Nombre del Cliente"
              value={formData.nombreCliente}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              name="telefonoCliente"
              label="Teléfono del Cliente"
              value={formData.telefonoCliente}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="date"
              name="fechaNacimientoCliente"
              label="Fecha de Nacimiento"
              value={formData.fechaNacimientoCliente}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <TextField
              type="text"
              name="apellidoCliente"
              label="Apellido del Cliente"
              value={formData.apellidoCliente}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                '& .MuiInputBase-input': { fontSize: '1.2rem' },
              }}
            />
            <div>
              <h3>Pedidos</h3>
              {pedidos.map((pedido, index) => (
                <div key={index}>
                  <TextField
                    type="text"
                    value={pedido}
                    onChange={(e) => handlePedidoChange(index, e.target.value)}
                    label={`Pedido ${index + 1}`}
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={() => removePedido(index)} variant="outlined" color="error">
                    Eliminar Pedido
                  </Button>
                </div>
              ))}
              <Button onClick={addPedido} variant="contained">Agregar Pedido</Button>
            </div>

            <div>
              <h3>Facturas</h3>
              {facturas.map((factura, index) => (
                <div key={index}>
                  <TextField
                    type="text"
                    value={factura}
                    onChange={(e) => handleFacturaChange(index, e.target.value)}
                    label={`Factura ${index + 1}`}
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={() => removeFactura(index)} variant="outlined" color="error">
                    Eliminar Factura
                  </Button>
                </div>
              ))}
              <Button onClick={addFactura} variant="contained">Agregar Factura</Button>
            </div>

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, fontSize: '1.2rem' }}
            >
              {selectedClientId ? 'Actualizar Cliente' : 'Crear Cliente'}
            </Button>
          </form>

          {/* Mensajes de éxito o error */}
          {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {/* Tabla de Clientes */}
          <h1>Lista de Clientes</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="clientes table">
              <TableHead>
                <TableRow>
                  <TableCell>DNI</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Fecha Nacimiento</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((cliente) => (
                    <TableRow key={cliente._id}>
                      <TableCell>{cliente.dniCliente}</TableCell>
                      <TableCell>{cliente.nombreCliente}</TableCell>
                      <TableCell>{cliente.telefonoCliente}</TableCell>
                      <TableCell>{new Date(cliente.fechaNacimientoCliente).toLocaleDateString()}</TableCell>
                      <TableCell>{cliente.apellidoCliente}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(cliente)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarCliente(cliente._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton onClick={() => handleShowDetails(cliente)}>
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
            count={clientes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Diálogo de Detalles */}
          {selectedCliente && (
            <Dialog open={Boolean(selectedCliente)} onClose={() => setSelectedCliente(null)}>
              <DialogTitle>Detalles del Cliente</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <strong>DNI:</strong> {selectedCliente.dniCliente}
                </DialogContentText>
                <DialogContentText>
                  <strong>Nombre:</strong> {selectedCliente.nombreCliente}
                </DialogContentText>
                <DialogContentText>
                  <strong>Teléfono:</strong> {selectedCliente.telefonoCliente}
                </DialogContentText>
                <DialogContentText>
                  <strong>Fecha Nacimiento:</strong> {new Date(selectedCliente.fechaNacimientoCliente).toLocaleDateString()}
                </DialogContentText>
                <DialogContentText>
                  <strong>Apellido:</strong> {selectedCliente.apellidoCliente}
                </DialogContentText>
                <DialogContentText>
                  <strong>Pedidos:</strong> {selectedCliente.pedidos.join(", ")}
                </DialogContentText>
                <DialogContentText>
                  <strong>Facturas:</strong> {selectedCliente.facturas.join(", ")}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setSelectedCliente(null)} color="primary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </Box>
    </Box>
  );
}
