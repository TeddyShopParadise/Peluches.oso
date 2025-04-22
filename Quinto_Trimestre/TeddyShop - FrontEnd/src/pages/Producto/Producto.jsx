import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import {
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material';
import { getApiUrl } from '../../utils/apiConfig';
import useApiRequest from '../../hooks/useApiRequest';

const apiUrl = getApiUrl();
console.log("Url almacenada: ", apiUrl);

const ProductoComponent = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [catalogos, setCatalogos] = useState([]);
  const [historialPrecios, setHistorialPrecios] = useState([]); 
  const [estiloProducto, setEstiloProducto] = useState('');
  const [materialProducto, setMaterialProducto] = useState('');
  const [disponibilidadProducto, setDisponibilidadProducto] = useState('');
  const [tamañoProducto, setTamañoProducto] = useState('');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [catalogosSeleccionados, setCatalogosSeleccionados] = useState([]);
  const [preciosSeleccionados, setPreciosSeleccionados] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagenProducto, setImagenProducto] = useState(null); 
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [openInventarioDialog, setOpenInventarioDialog] = useState(false);
  const [newProductId, setNewProductId] = useState(null);
  const [inventarioData, setInventarioData] = useState({
    stock: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    precioVenta: '',
    precioCompra: ''
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [inventarioExistente, setInventarioExistente] = useState(null);

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };
  const token = getAuthToken();

  useEffect(() => {
    fetchProductos();
    fetchCategorias();
    fetchCatalogos();
    fetchHistorialPrecios(); 
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
      setCatalogos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const fetchHistorialPrecios = async () => {
    try {
        const response = await fetch(`${apiUrl}/historialPrecio`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener los precios históricos');
        }
        const data = await response.json();
        setHistorialPrecios(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
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
        setImagenProducto(data.secure_url); 
      } catch (error) {
        console.error(error);
        alert("Error al cargar la imagen");
      }
    }
  };
  const { makeRequest } = useApiRequest();

  const crearProducto = async () => {
    if (!estiloProducto || !materialProducto || !disponibilidadProducto || !tamañoProducto || 
        categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      await Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }
  
    const productoData = {
      estiloProducto,
      materialProducto,
      disponibilidadProducto,
      tamañoProducto,
      categorias: categoriasSeleccionadas,
      catalogos: catalogosSeleccionados,
      historialPrecios: preciosSeleccionados,
      imagen: imagenProducto
    };
  
    await makeRequest({
      url: `${apiUrl}/producto`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      data: productoData,
      success: {
        title: 'Éxito',
        text: 'Producto creado correctamente',
        icon: 'success'
      },
      error: {
        title: 'Error',
        text: (error) => error.message || 'Error al crear el producto',
        icon: 'error'
      },
      onSuccess: (data) => {
        setNewProductId(data._id);
        setOpenInventarioDialog(true);
      }
    });
  };
  
  const actualizarProducto = async () => {
    if (!editingId || !estiloProducto || !materialProducto || !disponibilidadProducto || 
        categoriasSeleccionadas.length === 0 || catalogosSeleccionados.length === 0) {
      await Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
      return;
    }
  
    const productoData = {
      estiloProducto,
      materialProducto,
      disponibilidadProducto,
      tamañoProducto,
      imagen: imagenProducto,
      categorias: categoriasSeleccionadas || [],
      catalogos: catalogosSeleccionados,
      historialPrecios: preciosSeleccionados
    };
  
    await makeRequest({
      url: `${apiUrl}/producto/${editingId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },  
      data: productoData,
      success: {
        title: 'Éxito',
        text: 'Producto actualizado correctamente',
        icon: 'success'
      },
      error: {
        title: 'Error',
        text: (error) => error.message || 'Error al actualizar el producto',
        icon: 'error'
      },
      onSuccess: async () => {
        try {
          const inventarioResponse = await fetch(`${apiUrl}/inventario?producto=${editingId}`);
          if (inventarioResponse.ok) {
            const inventarioData = await inventarioResponse.json();
            if (inventarioData && inventarioData.length > 0) {
              setInventarioExistente(inventarioData[0]);
              setOpenConfirmDialog(true);
              return;
            }
          }
          resetForm();
          fetchProductos();
        } catch (error) {
          console.error('Error al buscar inventario:', error);
          resetForm();
          fetchProductos();
        }
      }
    });
  };
  
  const eliminarProducto = async (id) => {
    await makeRequest({
      url: `${apiUrl}/producto/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },  
      confirm: {
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      },
      success: {
        title: 'Eliminado',
        text: 'El producto ha sido eliminado correctamente',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      },
      error: {
        title: 'Error',
        text: (error) => error.message || 'Error al eliminar el producto',
        icon: 'error',
        confirmButtonColor: '#d33'
      },
      onSuccess: () => {fetchProductos
      setProductos(prev => prev.filter(p => p._id !== id));
  }});
  };
  
  
  

  const editarProducto = (producto) => {
    setEditingId(producto._id);
    setEstiloProducto(producto.estiloProducto || '');
    setMaterialProducto(producto.materialProducto || '');
    setDisponibilidadProducto(producto.disponibilidadProducto || '');
    setTamañoProducto(producto.tamañoProducto || '');
    setImagenProducto(producto.imagen || '');
    const categorias = Array.isArray(producto.categorias) ? producto.categorias : [];
    const catalogos = Array.isArray(producto.catalogos) ? producto.catalogos : [];
    const historialPrecio = Array.isArray(producto.historialPrecio) ? producto.historialPrecio : [];
};

const crearInventario = async () => {
  try {
    const productId = inventarioExistente ? editingId : newProductId;

    if (!productId) {
      throw new Error('No se encontró el ID del producto');
    }

    const url = inventarioExistente
      ? `${apiUrl}/inventario/${inventarioExistente._id}`
      : `${apiUrl}/inventario`;

    const method = inventarioExistente ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...inventarioData, idProducto: productId })
    });

    if (!response.ok) throw new Error(await response.text());

    Swal.fire(
      'Éxito',
      inventarioExistente 
        ? 'Inventario actualizado correctamente' 
        : 'Inventario creado correctamente',
      'success'
    );

    setOpenInventarioDialog(false);
    resetForm();
    fetchProductos();
    setInventarioExistente(null);
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};



const handleActualizarInventario = async () => {
  setOpenConfirmDialog(false);
  setOpenInventarioDialog(true);
  if (inventarioExistente) {
    setInventarioData({
      stock: inventarioExistente.stock,
      stockMinimo: inventarioExistente.stockMinimo,
      stockMaximo: inventarioExistente.stockMaximo,
      precioVenta: inventarioExistente.precioVenta,
      precioCompra: inventarioExistente.precioCompra
    });
  }
};

const handleNoActualizarInventario = () => {
  setOpenConfirmDialog(false);
  Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
  resetForm();
  fetchProductos();
};


  const resetForm = () => {
    setEstiloProducto('');
    setMaterialProducto('');
    setDisponibilidadProducto('');
    setTamañoProducto('');
    setImagenProducto('');
    setCategoriasSeleccionadas([]);
    setCatalogosSeleccionados([]);
    setPreciosSeleccionados([]);
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
        <h1>Gestión de Productos</h1>
        <TextField
          value={estiloProducto}
          onChange={(e) => setEstiloProducto(e.target.value)}
          label="Descripción Producto"
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

<FormControl fullWidth margin="normal" required>
  <InputLabel>Precio Histórico</InputLabel>
  <Select
    multiple
    value={preciosSeleccionados}
    onChange={(e) => { setPreciosSeleccionados(e.target.value); }}
    label="Precio Histórico"
    renderValue={(selected) => 
      selected.map(id => {
        const precio = historialPrecios.find(p => p._id === id);
        return precio ? new Intl.NumberFormat('es-CO', { 
          style: 'currency', 
          currency: 'COP' 
        }).format(precio.precio) : "";
      }).join(", ")
    }
  >
    {historialPrecios.map((precio) => (
      <MenuItem key={precio._id} value={precio._id}>
        {new Intl.NumberFormat('es-CO', { 
          style: 'currency', 
          currency: 'COP' 
        }).format(precio.precio)}
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
          label="Imagen del Producto"
          InputLabelProps={{ shrink: true }}
        />
        {imagenProducto && (
          <img src={imagenProducto} alt="Imagen del Producto" width="180 " height="auto"  style={{  objectFit: "cover", 
            borderRadius: "12px", 
            border: "2px solid rgba(255, 255, 255, 0.8)", 
            background: "rgba(255, 255, 255, 0.1)", 
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)"
            }}  
       />
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tamaño</TableCell>
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
                      <TableCell>{producto.tamañoProducto}</TableCell>
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
                        sx={{ color: "#d33" }}
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
        <Dialog
          open={selectedProducto !== null}
          onClose={closeDetailsDialog}
        >
          <DialogTitle>Detalles del Producto</DialogTitle>
          <DialogContent>
            {selectedProducto && (
              <Box>
                <DialogContentText>Descripción: {selectedProducto.estiloProducto}</DialogContentText>
                <strong>Precio:</strong>
                {selectedProducto.historialPrecios && selectedProducto.historialPrecios.length > 0 ? (
                  selectedProducto.historialPrecios.map((precioId, index) => {
                    const precio = historialPrecios.find(p => p._id === precioId);
                    return (
                      <div key={index}>
                        {precio ? (
                          new Intl.NumberFormat('es-CO', { 
                            style: 'currency', 
                            currency: 'COP' 
                          }).format(precio.precio)
                        ) : (
                          <span>Precio no disponible</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div>No hay precios históricos disponibles.</div>
                )}
                {selectedProducto.imagen && (
                  <DialogContentText>
                    <img src={selectedProducto.imagen} alt="Imagen del Producto" width="190" height="300"  style={{ 
                    objectFit: "cover",
                    display: "block",  
                    borderRadius: "12px", 
                    border: "2px solid rgba(137, 12, 227, 0.8)", 
                    background: "rgba(255, 255, 255, 0.1)", 
                    boxShadow: "0px 4px 15px   rgba(0, 0, 0, 0.25)", 
                    margin: "0 auto"
            }}  
                    />
                  </DialogContentText>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDetailsDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openConfirmDialog}
          onClose={() => {
            setOpenConfirmDialog(false);
            Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
            resetForm();
            fetchProductos();
          }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>¿Actualizar inventario?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Se encontró un inventario asociado a este producto. ¿Deseas actualizarlo también?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                setOpenConfirmDialog(false);
                Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
                resetForm();
                fetchProductos();
              }}
              color="primary"
              variant="outlined"
            >
              No, solo producto
            </Button>
            <Button 
              onClick={() => {
                setOpenConfirmDialog(false);
                setOpenInventarioDialog(true);
              }}
              color="primary" 
              variant="contained"
            >
              Sí, actualizar ambos
            </Button>
          </DialogActions>
        </Dialog>

       
        <Dialog
          open={openInventarioDialog}
          onClose={() => {
            setOpenInventarioDialog(false);
            setInventarioData({
              stock: null, 
              stockMinimo: null,
              stockMaximo: null,
              precioVenta: '',
              precioCompra: ''
            });
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {inventarioExistente ? 'Actualizar Inventario' : 'Crear Inventario'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Stock Inicial"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stock ?? ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stock: e.target.value === '' ? null : parseInt(e.target.value)
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 100'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Stock Mínimo"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stockMinimo ?? ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stockMinimo: e.target.value === '' ? null : parseInt(e.target.value)
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 10'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Stock Máximo"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.stockMaximo ?? ''}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  stockMaximo: e.target.value === '' ? null : parseInt(e.target.value)
                })}
                InputProps={{
                  inputProps: { 
                    min: 0,
                    placeholder: 'Ej: 200'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Precio de Venta"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.precioVenta}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  precioVenta: e.target.value
                })}
                InputProps={{
                  inputProps: { 
                    min: 0, 
                    step: "0.01",
                    placeholder: 'Ej: 19.99'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
              <TextField
                label="Precio de Compra"
                type="number"
                fullWidth
                margin="normal"
                value={inventarioData.precioCompra}
                onChange={(e) => setInventarioData({
                  ...inventarioData,
                  precioCompra: e.target.value
                })}
                InputProps={{
                  inputProps: { 
                    min: 0, 
                    step: "0.01",
                    placeholder: 'Ej: 15.50'
                  },
                  sx: {
                    '& input::placeholder': {
                      color: 'rgba(0, 0, 0, 0.38)',
                      opacity: 1
                    }
                  }
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => {
                setOpenInventarioDialog(false);
                setInventarioData({
                  stock: null,
                  stockMinimo: null,
                  stockMaximo: null,
                  precioVenta: '',
                  precioCompra: ''
                });
              }}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button 
              onClick={crearInventario}
              variant="contained" 
              color="primary"
              disabled={!inventarioData.precioVenta || !inventarioData.precioCompra}
            >
              {inventarioExistente ? 'Actualizar Inventario' : 'Crear Inventario'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ProductoComponent;
