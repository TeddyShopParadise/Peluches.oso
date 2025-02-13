import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
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
import { getApiUrl } from '../../utils/apiConfig';



const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const ProductoComponent = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [catalogos, setCatalogos] = useState([]);
  const [estiloProducto, setEstiloProducto] = useState('');
  const [cmCabezaColaProducto, setCmCabezaColaProducto] = useState('');
  const [materialProducto, setMaterialProducto] = useState('');
  const [disponibilidadProducto, setDisponibilidadProducto] = useState('');
  const [cmColaPataProducto, setCmColaPataProducto] = useState('');
  const [tamañoProducto, setTamañoProducto] = useState('');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [catalogosSeleccionados, setCatalogosSeleccionados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null); // State para imagen
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProducto, setSelectedProducto] = useState(null);


  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchCatalogos();
  }, []);
  

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/producto`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${apiUrl}/categorias`);
      if (!response.ok) throw new Error('Error al obtener las categorías');
      const data = await response.json();
      console.log("Categorías cargadas:", data);  // 🔍 Verifica en la consola
      setCategorias(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  
  const fetchCatalogos = async () => {
    try {
      const response = await fetch(`${apiUrl}/catalogos/activos`);
      if (!response.ok) throw new Error('Error al obtener los catálogos');
      const data = await response.json();
      console.log("Catálogos cargados:", data);  // 🔍 Verifica en la consola
      setCatalogos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Función para manejar la carga de la imagen
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
        setImagenProducto(data.secure_url); // La URL segura de la imagen
      } catch (error) {
        console.error(error);
        alert("Error al cargar la imagen");
      }
    }
  };

  const crearProducto = async () => {
    if (!estiloProducto || !cmCabezaColaProducto || !materialProducto || !disponibilidadProducto || !cmColaPataProducto || !tamañoProducto || categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/producto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estiloProducto,
          cmCabezaColaProducto,
          materialProducto,
          disponibilidadProducto,
          cmColaPataProducto,
          tamañoProducto,
          categorias: categoriasSeleccionadas,
          catalogos: catalogosSeleccionados,
          imagen: imagenProducto, // Agregamos la imagen
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      fetchProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const actualizarProducto = async () => {
    if (!editingId || !estiloProducto || !cmCabezaColaProducto || !materialProducto || !disponibilidadProducto || !cmColaPataProducto  || categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/producto/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estiloProducto,
          cmCabezaColaProducto,
          materialProducto,
          disponibilidadProducto,
          cmColaPataProducto,
          tamañoProducto,
          imagen: imagenProducto, // Agregamos la imagengen también
          categorias: categoriasSeleccionadas || [],
          catalogos: catalogosSeleccionados,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Lee el cuerpo de la respuesta
        console.error('Error:', errorText);
        throw new Error('Error al actualizar el producto');
      }
      fetchProductos();
      resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }


const eliminarProducto = async (id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/producto/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        Swal.fire({
          title: "Eliminado",
          text: "El producto ha sido eliminado correctamente",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        fetchProductos(); // Refresca la lista después de eliminar
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  });
};

  const editarProducto = (producto) => {
    console.log('Producto a editar:', producto);
    setEditingId(producto._id);
    setEstiloProducto(producto.estiloProducto || '');
    setCmCabezaColaProducto(producto.cmCabezaColaProducto || '');
    setMaterialProducto(producto.materialProducto || '');
    setDisponibilidadProducto(producto.disponibilidadProducto || '');
    setCmColaPataProducto(producto.cmColaPataProducto || '');
    setTamañoProducto(producto.tamañoProducto || '');
    setImagenProducto(producto.imagen || '');
    
    // Asegúrate de que las categorías y catálogos sean arrays
    const categorias = Array.isArray(producto.categorias) ? producto.categorias : [];
    const catalogos = Array.isArray(producto.catalogos) ? producto.catalogos : [];
    
   
  };
  const resetForm = () => {
    setEstiloProducto('');
    setCmCabezaColaProducto('');
    setMaterialProducto('');
    setDisponibilidadProducto('');
    setCmColaPataProducto('');
    setTamañoProducto('');
    setImagenProducto('');
    setCategoriasSeleccionadas([]);
    setCatalogosSeleccionados([]);
    setEditingId(null);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const openDetailsDialog = (producto) => {
    setSelectedProducto(producto);
  };

  const closeDetailsDialog = () => {
    setSelectedProducto(null);
  };

  useEffect(() => {
    
    fetchProductos();
    fetchCategorias();
    fetchCatalogos();
  }, []);

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: 'auto' },
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
          padding: { xs: '20px', md: '50px' },
          background:
            'linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))',
          borderRadius: '30px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(8px)',
          

        }}
      > 
        {/* Formulario de creación o actualización de producto */}
        <TextField
          value={estiloProducto}
          onChange={(e) => setEstiloProducto(e.target.value)}
          label="Estilo"
          fullWidth
          margin="normal"
        />
        <TextField
          value={cmCabezaColaProducto}
          onChange={(e) => setCmCabezaColaProducto(e.target.value)}
          label="Cm Cabeza Cola"
          fullWidth
          margin="normal"
        />
         <TextField
          value={cmColaPataProducto}
          onChange={(e) => setCmColaPataProducto(e.target.value)}
          label="Cm Cola Pata"
          fullWidth
          margin="normal"
        />
        <TextField
          value={materialProducto}
          onChange={(e) => setMaterialProducto(e.target.value)}
          label="Material"
          fullWidth
          margin="normal"
        />
        <TextField
          value={disponibilidadProducto}
          onChange={(e) => setDisponibilidadProducto(e.target.value)}
          label="Disponibilidad"
          fullWidth
          margin="normal"
        />
       
        <TextField
          value={tamañoProducto}
          onChange={(e) => setTamañoProducto(e.target.value)}
          label="Tamaño"
          fullWidth
          margin="normal"
        />
      <FormControl fullWidth margin="normal" required>
  <InputLabel>Categorías</InputLabel>
  <Select
    multiple
    value={categoriasSeleccionadas}
    onChange={(e) => setCategoriasSeleccionadas(e.target.value)}
    label="Categorías"
    renderValue={(selected) => selected.map(id => {
      const categoria = categorias.find(cat => cat._id === id);
      return categoria ? categoria.nombreCategoria : "";
    }).join(", ")}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 250,
          overflow: 'auto',
        },
      },
    }}
  >
    {categorias.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.nombreCategoria}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl fullWidth margin="normal" required>
  <InputLabel>Catálogos</InputLabel>
  <Select
    multiple
    value={catalogosSeleccionados}
    onChange={(e) => setCatalogosSeleccionados(e.target.value)}
    label="Catálogos"
    renderValue={(selected) => selected.map(id => {
      const catalogo = catalogos.find(cat => cat._id === id);
      return catalogo ? catalogo.nombreCatalogo : "";
    }).join(", ")}
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 250,
          overflow: 'auto',
        },
      },
    }}
  >
    {catalogos.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.nombreCatalogo}
      </MenuItem>
    ))}
  </Select>
</FormControl>
        {/* Campo para subir imagen */}
        <TextField
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
          fullWidth
          margin="normal"
          label="Imagen del Producto"
        />
        {imagenProducto && (
          <img src={imagenProducto} alt="Imagen del Producto" width="100" />
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={editingId ? actualizarProducto : crearProducto}
          >
            {editingId ? 'Actualizar Producto' : 'Crear Producto'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetForm}
            sx={{ ml: 2 }}
          >
            Cancelar
          </Button>
        </Box>

        {/* Tabla de productos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Estilo</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Disponibilidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((producto) => (
                  <TableRow key={producto._id}>
                    <TableCell>{producto.estiloProducto}</TableCell>
                    <TableCell>{producto.materialProducto}</TableCell>
                    <TableCell>{producto.disponibilidadProducto}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => editarProducto(producto)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => eliminarProducto(producto._id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => openDetailsDialog(producto)}
                      >
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={productos.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Dialogo para mostrar detalles del producto */}
        <Dialog
          open={selectedProducto !== null}
          onClose={closeDetailsDialog}
        >
          <DialogTitle>Detalles del Producto</DialogTitle>
          <DialogContent>
            {selectedProducto && (
              <Box>
                <DialogContentText>Estilo: {selectedProducto.estiloProducto}</DialogContentText>
                <DialogContentText>Material: {selectedProducto.materialProducto}</DialogContentText>
                <DialogContentText>Disponibilidad: {selectedProducto.disponibilidadProducto}</DialogContentText>
                {selectedProducto.imagen && (
                  <DialogContentText>
                    <img src={selectedProducto.imagen} alt="Imagen del Producto" width="100" />
                  </DialogContentText>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetailsDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ProductoComponent;
