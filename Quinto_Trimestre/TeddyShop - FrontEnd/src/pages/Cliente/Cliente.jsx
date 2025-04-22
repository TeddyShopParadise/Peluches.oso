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
    Fab 
  } from '@mui/material';
  import { Edit, Delete, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
  import '../PagesStyle.css';
  import { getApiUrl } from '../../utils/apiConfig'
  const apiUrl = getApiUrl();
  console.log("Url almacenada: ",apiUrl);
  import Swal from 'sweetalert2';
  import useApiRequest from '../../hooks/useApiRequest';



  export default function Cliente() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
      nombreCliente: '',
      telefonoCliente: '',
    });
    const [pedidos, setPedidos] = useState([]); 
    const [facturas, setFacturas] = useState([]); 
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { makeRequest } = useApiRequest();


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

    useEffect(() => {
      listarClientes();
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedClientId
        ? `${apiUrl}/clientes/${selectedClientId}`
        : `${apiUrl}/clientes`;
      const method = selectedClientId ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        telefonoCliente: formData.telefonoCliente.trim(), 
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

    const handleEdit = (cliente) => {
      setSelectedClientId(cliente._id);
      setFormData({
        nombreCliente: cliente.nombreCliente,
        telefonoCliente: cliente.telefonoCliente,
      });
      setPedidos(cliente.pedidos || []);
      setFacturas(cliente.facturas || []); 
    };

    const eliminarCliente = async (id) => {
      await makeRequest({
        url: `${apiUrl}/clientes/${id}`,
        method: 'DELETE',
        confirm: {
          title: 'Eliminar cliente',
          text: '¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.',
          icon: 'warning',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true,
          backdrop: `
            rgba(0,0,0,0.7)
            url("/images/warning.gif")
            center top
            no-repeat
          `
        },
        loading: {
          title: 'Eliminando...',
          html: 'Estamos eliminando el cliente',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Cliente eliminado!',
          text: 'El cliente ha sido eliminado correctamente.',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al eliminar cliente',
          text: (error) => error.message || 'Ocurrió un error al eliminar el cliente',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: listarClientes
      });
    };
    

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleShowDetails = (cliente) => {
      setSelectedCliente(cliente);
    };
  
    const filteredClientes = clientes.filter((cliente) =>
      cliente.telefonoCliente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    return (
      <Box className="BoxInicial">
        <Box className="Box"
          sx={{
            width: '90%',
            maxWidth: '900px',
            padding: '30px',
            borderRadius: '30px',
            margin: '0 auto',
            backgroundColor: '#fffafc',
            boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
            border: '2px solid #f8c8dc',
          }}
        >
          <Container>
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: '30px',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '25%',
                  width: '50%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
                  borderRadius: '10px',
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                }}
              >
                Lista de Clientes
              </Typography>
            </Box>
    
            {successMessage && (
              <Alert 
                severity="success" 
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  borderRadius: '10px',
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  border: '1px solid #a5d6a7',
                  '& .MuiAlert-icon': {
                    color: '#2e7d32'
                  }
                }}
              >
                {successMessage}
              </Alert>
            )}
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  borderRadius: '10px',
                  backgroundColor: '#ffebee',
                  color: '#c62828',
                  border: '1px solid #ef9a9a',
                  '& .MuiAlert-icon': {
                    color: '#c62828'
                  }
                }}
              >
                {error}
              </Alert>
            )}
    
            <Paper
              elevation={2}
              sx={{
                padding: '20px',
                borderRadius: '20px',
                marginBottom: '20px',
                backgroundColor: '#fff0f5',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '15px',
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Search fontSize="small" /> Buscar Clientes por número de telefono
              </Typography>
    
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 2,
                  padding: '8px 16px',
                  borderRadius: '15px',
                  border: '1px solid #f8c8dc',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                  backgroundColor: 'white',
                  maxWidth: '500px',
                  width: '100%',
                  margin: '0 auto',
                }}
              >
                <TextField
                  label="Buscar cliente por número"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                   onChange={handleSearchChange}
                  sx={{
                    width: '100%',
                    marginRight: 2,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&.Mui-focused fieldset': {
                        borderColor: '#f48fb1',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#f48fb1',
                      },
                    },
                  }}
                />
                <IconButton
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: '#f48fb1',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#ec7096',
                    },
                    boxShadow: '0 2px 5px rgba(244, 143, 177, 0.3)',
                  }}
                >
                  <Search />
                </IconButton>
              </Box>
            </Paper>
    
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                marginTop: 3,
                borderRadius: '15px',
                overflow: 'hidden',
                border: '1px solid #f8c8dc',
                overflowX: 'auto',

              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="clientes table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {filteredClientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente) => (
                  <TableRow key={cliente._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#fff0f5',
                        },
                      }}
                    >
                      <TableCell>{cliente.nombreCliente}</TableCell>
                      <TableCell>{cliente.telefonoCliente}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleEdit(cliente)}
                          sx={{
                            color: '#6c63ff',
                            '&:hover': {
                              backgroundColor: 'rgba(108, 99, 255, 0.1)',
                            },
                          }}
                        >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => eliminarCliente(cliente._id)}
                        sx={{
                          color: '#ff4081',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 64, 129, 0.1)',
                          },
                        }}
                      >
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
              count={clientes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                color: '#b04e6f',
                '& .MuiTablePagination-selectIcon': {
                  color: '#f48fb1',
                },
              }}
            />
    
            {selectedCliente && (
              <Dialog 
                open={Boolean(selectedCliente)} 
                onClose={() => setSelectedCliente(null)}
                PaperProps={{
                  sx: {
                    borderRadius: '15px',
                    border: '1px solid #f8c8dc',
                    boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
                    padding: '10px',
                  }
                }}
              >
                <DialogTitle 
                  sx={{ 
                    color: '#b04e6f', 
                    fontWeight: 'bold',
                    fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  }}
                >
                  Detalles del Cliente
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ color: '#666' }}>
                    <Typography sx={{ mb: 1 }}>
                      <strong style={{color: '#b04e6f'}}>Nombre:</strong> {selectedCliente.nombreCliente}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong style={{color: '#b04e6f'}}>Teléfono:</strong> {selectedCliente.telefonoCliente}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong style={{color: '#b04e6f'}}>Pedidos:</strong> {selectedCliente.pedidos.map(p => p._id).join(", ")}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                      <strong style={{color: '#b04e6f'}}>Facturas:</strong>
                    </Typography>
                    {selectedCliente?.facturas?.length > 0 ? (
                      selectedCliente.facturas.map((factura) => (
                        <Box 
                          key={factura._id}
                          sx={{
                            p: 1,
                            mb: 1,
                            borderRadius: '8px',
                            border: '1px solid #f8c8dc',
                            backgroundColor: '#fff5f7',
                          }}  
                        >
                          ID: {factura._id}
                        </Box>
                      ))
                    ) : (
                      <Box 
                        sx={{
                          p: 1,
                          borderRadius: '8px',
                          backgroundColor: '#fff5f7',
                          color: '#666',
                          fontStyle: 'italic'
                        }}
                      >
                        Sin facturas
                      </Box>
                    )}
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={() => setSelectedCliente(null)}
                    sx={{
                      borderRadius: '12px',
                      color: '#f48fb1',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 143, 177, 0.08)',
                      },
                      textTransform: 'none',
                      fontWeight: 'bold',
                    }}
                  >
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
