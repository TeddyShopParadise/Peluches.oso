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
    Box,
    TablePagination,
  } from '@mui/material';
  import Swal from 'sweetalert2';
  import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
  import '../PagesStyle.css';
  import { getApiUrl } from '../../utils/apiConfig'
  import useApiRequest from '../../hooks/useApiRequest';
  const apiUrl = getApiUrl();
  console.log("Url almacenada: ",apiUrl);

  const Compania = () => {
    const [companias, setCompanias] = useState([]);
    const [NIT, setNIT] = useState('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
    const [nombreEmpresa, setNombreEmpresa] = useState('');
    const [direccionEmpresa, setDireccionEmpresa] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [sortedBy, setSortedBy] = useState('nombreEmpresa');
    const [sortOrder, setSortOrder] = useState('asc');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCompania, setSelectedCompania] = useState(null);
    const { makeRequest } = useApiRequest();
    

    /*const getAuthToken = () => {
      const token = localStorage.getItem('authToken');
      return token;
    };
  */

    const fetchCompanias = async () => {
      try {
        //const token = getAuthToken();
        const response = await fetch(`${apiUrl}/Compania`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
             //'Authorization': `Bearer ${token}`, 
          },
        });
    
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

    const sortCompanias = (field) => {
      const order = sortedBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortedBy(field);
      setSortOrder(order);

      const sortedData = [...companias].sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
      });
      setCompanias(sortedData);
    };

    // Crear nueva compañía
    const crearCompania = async () => {
      if (!NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
        await Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos obligatorios.',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
          backdrop: `
            rgba(0,0,0,0.7)
            url("/images/empty-field.gif")
            center top
            no-repeat
          `
        });
        return;
      }
    
      const companiaData = { NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa };
    
      await makeRequest({
        url: `${apiUrl}/compania`,
        method: 'POST',
        data: companiaData,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Crear nueva compañía',
          text: '¿Estás seguro de que deseas crear esta compañía?',
          icon: 'question',
          confirmButtonText: 'Sí, crear',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        },
        loading: {
          title: 'Procesando...',
          html: 'Estamos creando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía creada!',
          text: 'La compañía se ha creado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al crear compañía',
          text: (error) => error.message || 'Ocurrió un error al crear la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: () => {
          fetchCompanias();
          resetForm();
        }
      });
    };
    
    const actualizarCompania = async () => {
      if (!editingId || !NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
        await Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos obligatorios.',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
          backdrop: `
            rgba(0,0,0,0.7)
            url("/images/empty-field.gif")
            center top
            no-repeat
          `
        });
        return;
      }
    
      const companiaData = { NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa };
    
      await makeRequest({
        url: `${apiUrl}/compania/${editingId}`,
        method: 'PUT',
        data: companiaData,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Actualizar compañía',
          text: '¿Estás seguro de que deseas actualizar esta compañía?',
          icon: 'question',
          confirmButtonText: 'Sí, actualizar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        },
        loading: {
          title: 'Procesando...',
          html: 'Estamos actualizando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía actualizada!',
          text: 'La compañía se ha actualizado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al actualizar compañía',
          text: (error) => error.message || 'Ocurrió un error al actualizar la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: () => {
          fetchCompanias();
          resetForm();
        }
      });
    };
    
    const eliminarCompania = async (id) => {
      await makeRequest({
        url: `${apiUrl}/compania/${id}`,
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${token}`, // Token comentado por ahora
        },
        confirm: {
          title: 'Eliminar compañía',
          text: '¿Estás seguro de que deseas eliminar esta compañía? Esta acción no se puede deshacer',
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
          html: 'Estamos eliminando la compañía',
          allowOutsideClick: false
        },
        success: {
          icon: 'success',
          title: '¡Compañía eliminada!',
          text: 'La compañía se ha eliminado correctamente',
          timer: 2000,
          timerProgressBar: true
        },
        error: {
          icon: 'error',
          title: 'Error al eliminar compañía',
          text: (error) => error.message || 'Ocurrió un problema al eliminar la compañía',
          footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
        },
        onSuccess: fetchCompanias
      });
    };

    // Cargar datos para editar
    const editarCompania = (compania) => {
      setEditingId(compania._id);
      setNIT(compania.NIT);
      setTelefonoEmpresa(compania.telefonoEmpresa);
      setNombreEmpresa(compania.nombreEmpresa);
      setDireccionEmpresa(compania.direccionEmpresa);
    };

    const verDetalles = (compania) => {
      setSelectedCompania(compania);
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
      setSelectedCompania(null);
    };

    const resetForm = () => {
      setNIT('');
      setTelefonoEmpresa('');
      setNombreEmpresa('');
      setDireccionEmpresa('');
      setEditingId(null);
    };

    useEffect(() => {
      fetchCompanias();
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
            <h1>Gestión de Compañías</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editingId ? actualizarCompania() : crearCompania();
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="number"
                label="NIT"
                value={NIT}
                onChange={(e) => setNIT(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                  },
                  '& input[type=number]': {
                    '-moz-appearance': 'textfield'
                  }
                }}
              />
              <TextField
                type="text"
                label="Teléfono de la Empresa"
                value={telefonoEmpresa}
                onChange={(e) => setTelefonoEmpresa(e.target.value)}
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
                label="Nombre de la Empresa"
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
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
                label="Dirección de la Empresa"
                value={direccionEmpresa}
                onChange={(e) => setDireccionEmpresa(e.target.value)}
                fullWidth
                margin="normal"
                required
                variant="outlined"
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
                        onClick={crearCompania}
                      >
                       Crear Compañia
                       </Button>
                    ) : (
                     <Button
                       variant="contained"
                       color="secondary"
                       onClick={actualizarCompania}
                     >
                       Actualizar Compañia
                     </Button>
                   )}
                       <Button variant="outlined" color="secondary" onClick={resetForm}>
                         Cancelar
                       </Button>
                     </Box>
            </form>

            <Box mt={4}>
              <h2>Lista de Compañías</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>NIT</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          Nombre
                          <IconButton onClick={() => sortCompanias('nombreEmpresa')}>
                            {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                          </IconButton>
                        </Box>
                      </TableCell>
                      
                      <TableCell>Dirección</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companias.map((comp) => (
                      <TableRow key={comp._id}>
                         <TableCell>{comp.NIT}</TableCell>
                        <TableCell>{comp.nombreEmpresa}</TableCell>
                        <TableCell>{comp.direccionEmpresa}</TableCell>
                        <TableCell>
                          <IconButton
                          color="info"
                          onClick={() => verDetalles(comp)}>
                            <Info />
                          </IconButton>
                          <IconButton
                          color="primary" 
                          onClick={() => editarCompania(comp)}>
                            <Edit />
                          </IconButton>
                          <IconButton 
                              sx={{ color: "#d33" }}
                          onClick={() => eliminarCompania(comp._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
    
            {selectedCompania && (
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Detalles de la Compañía</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  <strong>NIT:</strong> {selectedCompania.NIT}
                  <br />  
                  <strong>Nombre:</strong> {selectedCompania.nombreEmpresa}
                   <br />
                  <strong>Dirección:</strong> {selectedCompania.direccionEmpresa}
                    <br />
                  <strong>Teléfono:</strong> {selectedCompania.telefonoEmpresa}
                    <br /> 
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cerrar
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </Container>
        </Box>
      </Box>
    );
    
  };

  export default Compania;
