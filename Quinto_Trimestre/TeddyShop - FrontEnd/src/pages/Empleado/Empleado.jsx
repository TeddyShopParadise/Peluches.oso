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
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
} from '@mui/material';
import { getApiUrl } from '../../utils/apiConfig';

const apiUrl = getApiUrl();

const Empleado = () => {
  // Definir el estado de los empleados y los campos del formulario
  const [formData, setFormData] = useState({
    dniEmpleado: '',
    telefonoEmpleado: '',
    codigoEmpleado: '',
    fechaNacimientoEmpleado: '',
    nombreEmpleado: '',
    compania: '',
    usuario: '',
    vendedor: ''
  });
  const [empleados, setEmpleados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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

  // Manejo de cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Crear un nuevo empleado
  const crearEmpleado = async () => {
    const { dniEmpleado, telefonoEmpleado, codigoEmpleado, nombreEmpleado, compania } = formData;
    if (!dniEmpleado || !telefonoEmpleado || !codigoEmpleado || !nombreEmpleado || !compania) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/empleado`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el empleado');
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
    const { dniEmpleado, telefonoEmpleado, codigoEmpleado, nombreEmpleado, compania } = formData;
    if (!editingId || !dniEmpleado || !telefonoEmpleado || !codigoEmpleado || !nombreEmpleado || !compania) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Depuración: mostrar URL y datos
    console.log("Actualizando empleado con ID:", editingId);
    console.log("Datos a actualizar:", formData);

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
    if (window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      try {
        const response = await fetch(`${apiUrl}/empleado/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el empleado');
        }

        fetchEmpleados();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  // Cargar los datos del empleado a editar
  const editarEmpleado = (empleado) => {
    setEditingId(empleado._id);
    setFormData({
      dniEmpleado: empleado.dniEmpleado || '',
      telefonoEmpleado: empleado.telefonoEmpleado || '',
      codigoEmpleado: empleado.codigoEmpleado || '',
      fechaNacimientoEmpleado: empleado.fechaNacimientoEmpleado || '',
      nombreEmpleado: empleado.nombreEmpleado || '',
      compania: empleado.compania || '',
      usuario: empleado.usuario || '',
      vendedor: empleado.vendedor || ''
    });
  };


  // Ver detalles del empleado
  const verDetalles = (empleado) => {
    setSelectedEmpleado(empleado);
    setDialogOpen(true);
  };

  // Cerrar el diálogo de detalles
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmpleado(null);
  };

  // Restablecer el formulario
  const resetForm = () => {
    setFormData({
      dniEmpleado: '',
      telefonoEmpleado: '',
      codigoEmpleado: '',
      fechaNacimientoEmpleado: '',
      nombreEmpleado: '',
      compania: '',
      usuario: '',
      vendedor: ''
    });
    setEditingId(null);
  };

  // Ordenar los empleados
  const sortedEmpleados = [...empleados].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.nombreEmpleado.localeCompare(b.nombreEmpleado);
    } else {
      return b.nombreEmpleado.localeCompare(a.nombreEmpleado);
    }
  });

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    
    <Container>
      <Box>
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
            label="Código"
            name="codigoEmpleado"
            value={formData.codigoEmpleado || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Nombre"
            name="nombreEmpleado"
            value={formData.nombreEmpleado || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Compañía"
            name="compania"
            value={formData.compania || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Usuario"
            name="usuario"
            value={formData.usuario || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Vendedor"
            name="vendedor"
            value={formData.vendedor || ''}
            onChange={handleInputChange}
          />

          <Button
            variant="contained"
            onClick={editingId ? actualizarEmpleado : crearEmpleado}
          >
            {editingId ? 'Actualizar' : 'Crear'} Empleado
          </Button>
        </form>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmpleados.map((empleado) => (
              <TableRow key={empleado._id}>
                <TableCell>{empleado.nombreEmpleado}</TableCell>
                <TableCell>{empleado.dniEmpleado}</TableCell>
                <TableCell>{empleado.telefonoEmpleado}</TableCell>

                <TableCell>
                  <IconButton onClick={() => editarEmpleado(empleado)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => eliminarEmpleado(empleado._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => verDetalles(empleado)}>
                    <Info />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Detalles del Empleado</DialogTitle>
        <DialogContent>
          {selectedEmpleado && (
            <Box>
              <p><strong>Nombre:</strong> {selectedEmpleado.nombreEmpleado}</p>
              <p><strong>DNI:</strong> {selectedEmpleado.dniEmpleado}</p>
              <p><strong>Teléfono:</strong> {selectedEmpleado.telefonoEmpleado}</p>
              <p><strong>Fecha de Nacimiento:</strong> {selectedEmpleado.fechaNacimientoEmpleado}</p>
              <p><strong>Compañía:</strong> {selectedEmpleado.compania ? selectedEmpleado.compania.nombreEmpresa : 'No disponible'}</p>
              <p><strong>Usuario:</strong> {selectedEmpleado.usuario ? selectedEmpleado.usuario.email : 'No disponible'}</p>
              <p><strong>Vendedor:</strong> {selectedEmpleado.vendedor ? selectedEmpleado.vendedor._id : 'No disponible'}</p>


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
