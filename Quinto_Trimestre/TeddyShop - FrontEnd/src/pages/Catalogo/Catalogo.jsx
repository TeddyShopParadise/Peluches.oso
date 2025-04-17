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
import Swal from 'sweetalert2';
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';


const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const CatalogoComponent = () => {
  const [catalogos, setCatalogos] = useState([]);
  const [companias, setCompanias] = useState([]);
  const [nombreCatalogo, setNombreCatalogo] = useState('');
  const [descripcionCatalogo, setDescripcionCatalogo] = useState('');
  const [disponibilidadCatalogo, setDisponibilidadCatalogo] = useState(true);
  const [estiloCatalogo, setEstiloCatalogo] = useState('');
  const [imagenCatalogo, setImagenCatalogo] = useState(null);
  const [companiaSeleccionada, setCompaniaSeleccionada] = useState('');
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
  const { makeRequest } = useApiRequest();

  const crearCatalogo = async () => {
    if (!nombreCatalogo || !estiloCatalogo || !companiaSeleccionada) {
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
  
    const catalogoData = {
      nombreCatalogo,
      descripcionCatalogo,
      disponibilidadCatalogo,
      estiloCatalogo,
      compania: companiaSeleccionada,
      imagen: imagenCatalogo
    };
  
    await makeRequest({
      url: `${apiUrl}/catalogos`,
      method: 'POST',
      data: catalogoData,
      confirm: {
        title: 'Crear nuevo catálogo',
        text: '¿Estás seguro de que deseas crear este catálogo?',
        icon: 'question',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        reverseButtons: true
      },
      loading: {
        title: 'Procesando...',
        html: 'Estamos creando tu catálogo',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Catálogo creado!',
        text: 'El catálogo se ha creado correctamente',
        confirmButtonColor: '#28a745',
        timer: 2000,
        timerProgressBar: true
      },
      error: {
        icon: 'error',
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al crear el catálogo',
        confirmButtonColor: '#d33',
        footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
      },
      onSuccess: () => {
        fetchCatalogos();
        resetForm();
      }
    });
  };
  
  const actualizarCatalogo = async () => {
    if (!editingId || !nombreCatalogo || !estiloCatalogo || !companiaSeleccionada) {
      await Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos obligatorios.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    const requestBody = {
      nombreCatalogo,
      descripcionCatalogo: descripcionCatalogo || undefined,
      disponibilidadCatalogo,
      estiloCatalogo,
      compania: companiaSeleccionada,
      imagen: imagenCatalogo || undefined
    };
  
    Object.keys(requestBody).forEach(key => 
      requestBody[key] === undefined && delete requestBody[key]
    );
  
    await makeRequest({
      url: `${apiUrl}/catalogos/${editingId}`,
      method: 'PUT',
      data: requestBody,
      confirm: {
        title: '¿Confirmar cambios?',
        text: '¿Estás seguro de que deseas actualizar este catálogo?',
        icon: 'question',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      },
      loading: {
        title: 'Actualizando...',
        allowOutsideClick: false
      },
      success: {
        icon: 'success',
        title: '¡Actualizado!',
        text: 'El catálogo ha sido actualizado correctamente.',
        confirmButtonColor: '#3085d6'
      },
      error: {
        icon: 'error',
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al actualizar el catálogo',
        confirmButtonColor: '#3085d6'
      },
      onSuccess: () => {
        fetchCatalogos();
        resetForm();
      }
    });
  };
  
  const eliminarCatalogo = async (id) => {
    await makeRequest({
      url: `${apiUrl}/catalogos/${id}/desactivar`,
      method: 'PATCH',
      confirm: {
        title: '¿Estás seguro?',
        text: '¿Estás seguro de que deseas eliminar este catálogo?',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      },
      success: {
        title: 'Eliminado!',
        text: 'El catálogo ha sido eliminado.',
        icon: 'success'
      },
      error: {
        title: 'Error',
        text: (error) => error.message || 'Ocurrió un error al eliminar el catálogo',
        icon: 'error'
      },
      onSuccess: fetchCatalogos
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "peluches"); 
  
        const response = await fetch("https://api.cloudinary.com/v1_1/peluches/image/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }
  
        const data = await response.json();
        setImagenCatalogo(data.secure_url); 
      } catch (error) {
        console.error(error);
        alert("Error al cargar la imagen");
      }
    }
  };

  const editarCatalogo = (catalogo) => {
    setEditingId(catalogo._id); 
    setNombreCatalogo(catalogo.nombreCatalogo);
    setDescripcionCatalogo(catalogo.descripcionCatalogo || '');
    setDisponibilidadCatalogo(catalogo.disponibilidadCatalogo);
    setEstiloCatalogo(catalogo.estiloCatalogo);
    setCompaniaSeleccionada(catalogo.compania._id || catalogo.compania);
    setImagenCatalogo(catalogo.imagen || null);
  };

  const resetForm = () => {
    setNombreCatalogo('');
    setDescripcionCatalogo('');
    setDisponibilidadCatalogo(true);
    setEstiloCatalogo('');
    setCompaniaSeleccionada('');
    setImagenCatalogo(null);
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
            <TextField
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={handleImageChange}
              fullWidth
              margin="normal"
              label="Imagen del Catálogo"
              InputLabelProps={{ shrink: true }}
            />

            {imagenCatalogo && (
              <img 
                src={imagenCatalogo} 
                alt="Imagen del Catálogo" 
                width="180" 
                height="auto"  
                style={{  
                  objectFit: "cover", 
                  borderRadius: "12px", 
                  border: "2px solid rgba(255, 255, 255, 0.8)", 
                  background: "rgba(255, 255, 255, 0.1)", 
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
                  marginTop: "10px"
                }}  
              />
            )}

          <Box display="flex" justifyContent="space-between" mt={2} gap={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                fontSize: '1.2rem', 
                flex: 1, // Ocupa el espacio disponible
                minWidth: 0 // Permite que el flex funcione mejor
              }}
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetForm}
              sx={{ 
                fontSize: '1.2rem', 
                flex: 1, // Ocupa el espacio disponible
                minWidth: 0 // Permite que el flex funcione mejor
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
            <TableCell>
                  {catalogo.compania?.nombreEmpresa || 'Sin compañía'}
            </TableCell>
                <TableCell>
                  <IconButton
                  color='primary'
                  onClick={() => editarCatalogo(catalogo)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                  sx={{ color: "#d33" }}
                  onClick={() => eliminarCatalogo(catalogo._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton
                  color="info"
                  onClick={() => openDetailsDialog(catalogo)}>
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
              <strong>Compañía:</strong> {selectedCatalogo.compania?.nombreEmpresa || 'Sin compañía'}
            </DialogContentText>
            <DialogContentText>
              <strong>Descripción:</strong> {selectedCatalogo.descripcionCatalogo || 'Sin descripción'}
            </DialogContentText>
            
            {selectedCatalogo.imagen && (
              <Box mt={2}>
                <img 
                  src={selectedCatalogo.imagen} 
                  alt="Imagen del Catálogo" 
                  width="190" 
                  height="300"  
                  style={{ 
                    objectFit: "cover",
                    display: "block",  
                    borderRadius: "12px", 
                    border: "2px solid rgba(137, 12, 227, 0.8)", 
                    background: "rgba(255, 255, 255, 0.1)", 
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)", 
                    margin: "0 auto"
                  }}  
                />
              </Box>
            )}
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