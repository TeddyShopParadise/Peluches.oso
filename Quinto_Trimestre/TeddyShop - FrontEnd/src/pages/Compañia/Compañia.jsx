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
  Switch,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward, Info } from '@mui/icons-material';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Compania = () => {
  const [companias, setCompanias] = useState([]);
  const [NIT, setNIT] = useState('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [catalogos, setCatalogos] = useState([]); // Agregado para catalogos
  const [empleados, setEmpleados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortedBy, setSortedBy] = useState('nombreEmpresa');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCompania, setSelectedCompania] = useState(null);

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  const token = getAuthToken();

  // Obtener la lista de compañías
  const fetchCompanias = async () => {
    try {
      const token = getAuthToken(); // Obtener el token
      const response = await fetch(`${apiUrl}/compania`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Añadir el token al encabezado
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

  // Ordenar compañías
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
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const token = getAuthToken(); // Obtener el token
      const response = await fetch(`${apiUrl}/compania`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Añadir el token al encabezado
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa, catalogos, empleados }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la compañía');
      }
  
      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  const actualizarCompania = async () => {
    if (!editingId || !NIT || !telefonoEmpresa || !nombreEmpresa || !direccionEmpresa) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const token = getAuthToken(); // Obtener el token
      const response = await fetch(`${apiUrl}/compania/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Añadir el token al encabezado
        },
        body: JSON.stringify({ NIT, telefonoEmpresa, nombreEmpresa, direccionEmpresa, catalogos, empleados }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al actualizar la compañía: ${errorMessage}`);
      }
  
      fetchCompanias();
      resetForm();
    } catch (error) {
      console.error('Error en actualizarCompania:', error.message);
      alert(error.message);
    }
  };
  
  const eliminarCompania = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta compañía?')) {
      try {
        const token = getAuthToken(); // Obtener el token
        const response = await fetch(`${apiUrl}/compania/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Añadir el token al encabezado
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar la compañía');
        }
  
        fetchCompanias();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  // Cargar datos para editar
  const editarCompania = (compania) => {
    setEditingId(compania._id);
    setNIT(compania.NIT);
    setTelefonoEmpresa(compania.telefonoEmpresa);
    setNombreEmpresa(compania.nombreEmpresa);
    setDireccionEmpresa(compania.direccionEmpresa);
    setCatalogos(compania.catalogos || []); // Cargar catalogos
    setEmpleados(compania.empleados || []);
  };

  // Mostrar detalles de la compañía
  const verDetalles = (compania) => {
    setSelectedCompania(compania);
    setDialogOpen(true);
  };

  // Cerrar el diálogo de detalles
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCompania(null);
  };

  // Restablecer formulario
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

  // Funciones para gestionar catalogos
const addCatalogo = () => setCatalogos([...catalogos, ""]);
const handleCatalogoChange = (index, value) => {
  const newCatalogos = [...catalogos];
  newCatalogos[index] = value;
  setCatalogos(newCatalogos);
};
const removeCatalogo = (index) => {
  const newCatalogos = catalogos.filter((_, i) => i !== index);
  setCatalogos(newCatalogos);
};

// Funciones para gestionar empleados
const addEmpleado = () => setEmpleados([...empleados, ""]);
const handleEmpleadoChange = (index, value) => {
  const newEmpleados = [...empleados];
  newEmpleados[index] = value;
  setEmpleados(newEmpleados);
};
const removeEmpleado = (index) => {
  const newEmpleados = empleados.filter((_, i) => i !== index);
  setEmpleados(newEmpleados);
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

             {/* Campos para Catalogos */}
          <h3>Catálogos</h3>
          {catalogos.map((catalogo, index) => (
            <Box display="flex" alignItems="center" key={index} mt={1}>
              <TextField
                label={`Catálogo ${index + 1}`}
                value={catalogo}
                onChange={(e) => handleCatalogoChange(index, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <IconButton onClick={() => removeCatalogo(index)} color="secondary">
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={addCatalogo} sx={{ mt: 1 }}>
            Añadir Catálogo
          </Button>

           {/* Campos para Empleados */}
           <h3>Empleados</h3>
          {empleados.map((empleado, index) => (
            <Box display="flex" alignItems="center" key={index} mt={1}>
              <TextField
                label={`Empleado ${index + 1}`}
                value={empleado}
                onChange={(e) => handleEmpleadoChange(index, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{
                  '& .MuiInputLabel-root': { fontSize: '1.2rem' },
                  '& .MuiInputBase-input': { fontSize: '1.2rem' },
                }}
              />
              <IconButton onClick={() => removeEmpleado(index)} color="secondary">
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button variant="outlined" onClick={addEmpleado} sx={{ mt: 1 }}>
            Añadir Empleado
          </Button>



            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button type="submit" variant="contained" sx={{ fontSize: '1.2rem' }}>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="outlined"
                sx={{ fontSize: '1.2rem' }}
              >
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
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Nombre
                        <IconButton onClick={() => sortCompanias('nombreEmpresa')}>
                          {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Teléfono
                        <IconButton onClick={() => sortCompanias('telefonoEmpresa')}>
                          {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Catálogos</TableCell>
                    <TableCell>Empleados</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companias.map((comp) => (
                    <TableRow key={comp._id}>
                      <TableCell>{comp.nombreEmpresa}</TableCell>
                      <TableCell>{comp.telefonoEmpresa}</TableCell>
                      <TableCell>{comp.direccionEmpresa}</TableCell>
                      <TableCell>{comp.catalogos.join(", ")}</TableCell> {/* Mostrar catalogos */}
                      <TableCell>{comp.empleados.join(", ")}</TableCell> {/* Mostrar empleados */}
                      <TableCell>
                        <IconButton onClick={() => verDetalles(comp)}>
                          <Info />
                        </IconButton>
                        <IconButton onClick={() => editarCompania(comp)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => eliminarCompania(comp._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
  
          {/* Diálogo de detalles */}
          {selectedCompania && (
            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Detalles de la Compañía</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <strong>Nombre:</strong> {selectedCompania.nombreEmpresa}
                  <br />
                  <strong>NIT:</strong> {selectedCompania.NIT}
                  <br />
                  <strong>Teléfono:</strong> {selectedCompania.telefonoEmpresa}
                  <br />
                  <strong>Dirección:</strong> {selectedCompania.direccionEmpresa}
                  <br />
                  <strong>Catálogos:</strong> {selectedCompania.catalogos.join(", ")}
                  <br />
                  <strong>Empleados:</strong> {selectedCompania.empleados.join(", ")}
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
