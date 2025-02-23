import React, { useState, useEffect } from 'react';
import { ArrowUpward, ArrowDownward, Delete, Edit, Info } from '@mui/icons-material';
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
  Select,
  MenuItem,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
} from '@mui/material';
import { getApiUrl } from '../../utils/apiConfig';
import Swal from 'sweetalert2';

const apiUrl = getApiUrl();

const Empleado = () => {
  const [formData, setFormData] = useState({
    dniEmpleado: '',
    telefonoEmpleado: '',
    nombreEmpleado: '',
    compania: '',
  });
  const [empleados, setEmpleados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [companias, setCompanias] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchEmpleados();
    fetchCompanias();
  }, []);

  // Obtener empleados desde el servidor
  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${apiUrl}/empleado`);
      if (!response.ok) {
        throw new Error('Error al obtener los empleados');
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchCompanias = async () => {
    try {
      //const token = getAuthToken();
      const response = await fetch(`${apiUrl}/Compania`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
//'Authorization': `Bearer ${token}`, // Añadir el token al encabezado
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

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear un nuevo empleado
  const crearEmpleado = async () => {
    const { dniEmpleado, telefonoEmpleado, nombreEmpleado, compania } = formData;
    if (!dniEmpleado || !telefonoEmpleado || !nombreEmpleado || !compania) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    console.log("Enviando datos:", JSON.stringify(formData));
    try {
      const response = await fetch(`${apiUrl}/empleado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (!response.ok) {
        console.error("Error en el backend:", responseData);
        throw new Error(responseData.message || 'Error al crear el empleado');
      }
      fetchEmpleados();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Actualizar un empleado
  const actualizarEmpleado = async () => {
    const { dniEmpleado, telefonoEmpleado, nombreEmpleado, compania } = formData;
    if (!editingId || !dniEmpleado || !telefonoEmpleado  || !nombreEmpleado || !compania) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/empleado/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el empleado: ${response.statusText}`);
      }

      fetchEmpleados();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };


  // Eliminar un empleado
  const eliminarEmpleado = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/empleado/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar el empleado');
        }
  
        await Swal.fire(
          '¡Eliminado!',
          'El empleado ha sido eliminado correctamente.',
          'success'
        );
        fetchEmpleados();
      } catch (error) {
        console.error(error);
        Swal.fire('Error', error.message, 'error');
      }
    }
  };
  
 
  const editarEmpleado = (empleado) => {
    setEditingId(empleado._id);
    setFormData({
      dniEmpleado: empleado.dniEmpleado || '',
      telefonoEmpleado: empleado.telefonoEmpleado || '',
      nombreEmpleado: empleado.nombreEmpleado || '',
      compania: empleado.compania || ''

    });
  };

  const verDetalles = (empleado) => {
    setSelectedEmpleado(empleado);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmpleado(null);
  };

  const resetForm = () => {
    setFormData({
      dniEmpleado: '',
      telefonoEmpleado: '',
      nombreEmpleado: '',
      compania: '',
    });
    setEditingId(null);
  };

  const sortedEmpleados = [...empleados].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.nombreEmpleado.localeCompare(b.nombreEmpleado);
    } else {
      return b.nombreEmpleado.localeCompare(a.nombreEmpleado);
    }
  });

  return (
    
    <Container>
      <Box className="BoxInicial" sx={{ justifySelf: 'center'}}>
        <Box className="Box"
          sx={{
            width: '90%',
            maxWidth: '100%',
            padding: { xs: '2px', md: '50px' },
            borderRadius: '30px',
          }}
        >
          <h2>{editingId ? 'Editar' : 'Crear'} Empleado</h2>
          <form>
            <TextField
              label="DNI"
              name="dniEmpleado"
              value={formData.dniEmpleado || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Teléfono"
              name="telefonoEmpleado"
              value={formData.telefonoEmpleado || ''}
              onChange={handleInputChange}
            />
            <TextField
              label="Nombre"
              name="nombreEmpleado"
              value={formData.nombreEmpleado || ''}
              onChange={handleInputChange}
            />
           <Select
            name="compania"
            value={formData.compania}
            onChange={(e) => setFormData({ ...formData, compania: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>Selecciona una Compañía</MenuItem>
            {companias.map((comp) => (
              <MenuItem key={comp._id} value={comp._id}>
                {comp.nombreEmpresa}
              </MenuItem>
            ))}
          </Select>

             <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2  }}>
                          {!editingId ? (
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={crearEmpleado}
                      >
                       Crear Empleado
                       </Button>
                    ) : (
                     <Button
                       variant="contained"
                       color="secondary"
                       onClick={actualizarEmpleado}
                     >
                       Actualizar Empleado
                     </Button>
                   )}
                       <Button variant="outlined" color="secondary" onClick={resetForm}>
                         Cancelar
                       </Button>
                     </Box>
          </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmpleados.map((empleado) => (
              <TableRow key={empleado._id}>
                <TableCell>{empleado.dniEmpleado}</TableCell>
                <TableCell>{empleado.nombreEmpleado}</TableCell>
                <TableCell>{empleado.telefonoEmpleado}</TableCell>
                <TableCell>
                  <IconButton
                 color='primary'
                  onClick={() => editarEmpleado(empleado)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                   sx={{ color: "#d33" }}
                  onClick={() => eliminarEmpleado(empleado._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton 
                   color='info'
                  onClick={() => verDetalles(empleado)}>
                    <Info />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Empleado</DialogTitle>
        <DialogContent>
          {selectedEmpleado && (
            <Box>
              <p><strong>Nombre:</strong> {selectedEmpleado.nombreEmpleado}</p>
              <p><strong>DNI:</strong> {selectedEmpleado.dniEmpleado}</p>
              <p><strong>Compañía:</strong> {selectedEmpleado.compania ? selectedEmpleado.compania.nombreEmpresa : 'No disponible'}</p>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Empleado;
