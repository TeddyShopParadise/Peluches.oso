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

  export default function Cliente() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
      nombreCliente: '',
      telefonoCliente: '',
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
        const response = await fetch(`${apiUrl}/clientes`);
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
    // Función para crear o actualizar un cliente

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedClientId
        ? `${apiUrl}/clientes/${selectedClientId}`
        : `${apiUrl}/clientes`;
      const method = selectedClientId ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        telefonoCliente: formData.telefonoCliente.trim(), // opcionalmente limpiar espacios
        pedidos,
        facturas
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataToSend, pedidos, facturas }),
      });

      // Procesamiento de la respuesta
      if (response.ok) {
        await listarClientes();
        setFormData({
          nombreCliente: '',
          telefonoCliente: ''
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
        nombreCliente: cliente.nombreCliente,
        telefonoCliente: cliente.telefonoCliente,
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
            {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            {/* Tabla de Clientes */}
            <h1>Lista de Clientes</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="clientes table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((cliente) => (
                      <TableRow key={cliente._id}>
                        <TableCell>{cliente.nombreCliente}</TableCell>
                        <TableCell>{cliente.telefonoCliente}</TableCell>
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
                    <strong>Nombre:</strong> {selectedCliente.nombreCliente}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Teléfono:</strong> {selectedCliente.telefonoCliente}
                  </DialogContentText>
                  <DialogContentText>
                    <strong>Pedidos:</strong> {selectedCliente.pedidos.map(p => p._id).join(", ")}
                  </DialogContentText>
                  <DialogContentText>
                  <strong>Facturas:</strong>
                  {selectedCliente?.facturas?.length > 0 ? (
                    selectedCliente.facturas.map((factura) => (
                      <div key={factura._id}>
                        ID: {facturas._id}<br />
                        <hr />
                      </div>
                    ))
                  ) : (
                    <div>Sin facturas</div>
                  )}
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
