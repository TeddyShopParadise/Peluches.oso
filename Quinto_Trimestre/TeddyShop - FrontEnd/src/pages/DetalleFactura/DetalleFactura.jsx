import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  Edit,
  Delete,
  ArrowUpward,
  ArrowDownward,
  Info,
} from "@mui/icons-material";
import "../PagesStyle.css";
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const DetalleFactura = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalle, setDetalle] = useState({
    numDetalle: "",
    precioDetalleFactura: "",
    cantidadDetalleFactura: "",
    inventarioIdInventario: "",
    productoIdProducto: "",
    facturaIdFactura: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [detalleDialog, setDetalleDialog] = useState(null); // Para mostrar los detalles
  const [page, setPage] = useState(0); // Para paginación
  const [rowsPerPage, setRowsPerPage] = useState(5); // Para paginación
  const [productos, setProductos] = useState([]);
  const [inventarios, setInventarios] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [inventarioSeleccionado, setInventarioSeleccionado] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState("");

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${apiUrl}/productos`);
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInventarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventarios`);
      if (!response.ok) {
        throw new Error("Error al obtener los inventarios");
      }
      const data = await response.json();
      setInventarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFacturas = async () => {
    try {
      const response = await fetch(`${apiUrl}/facturas`);
      if (!response.ok) {
        throw new Error("Error al obtener las facturas");
      }
      const data = await response.json();
      setFacturas(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para obtener los detalles de factura
  const fetchDetalles = async () => {
    try {
      const response = await fetch(
        `${apiUrl}/detallesFactura`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles");
      }
      const data = await response.json();
      setDetalles(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para cargar detalles al montar el componente
  useEffect(() => {
    fetchDetalles();
    fetchProductos();
    fetchInventarios();
    fetchFacturas();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setDetalle({ ...detalle, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario para crear o actualizar un detalle
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica el contenido de detalleConDatos antes de enviarlo
    const detalleConDatos = {
      ...detalle,
      productoIdProducto: productoSeleccionado,
      inventarioIdInventario: inventarioSeleccionado,
      facturaIdFactura: facturaSeleccionada,
    };

    console.log(detalleConDatos); // Verifica que todos los campos estén correctos

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${apiUrl}/detallesFactura/${editingId}`
      : `${apiUrl}/detallesFactura`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detalleConDatos),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el detalle de la factura");
      }

      fetchDetalles();
      setDetalle({
        numDetalle: "",
        precioDetalleFactura: "",
        cantidadDetalleFactura: "",
        inventarioIdInventario: "",
        productoIdProducto: "",
        facturaIdFactura: "",
      });
      setProductoSeleccionado("");
      setInventarioSeleccionado("");
      setFacturaSeleccionada("");
      setEditingId(null);
    } catch (error) {
      console.error("Error al guardar el detalle:", error);
    }
  };

  // Manejar la edición de un detalle
  const handleEdit = (detalle) => {
    setDetalle(detalle);
    setEditingId(detalle._id);
  };

  // Manejar la eliminación de un detalle
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${apiUrl}/detallesFactura/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el detalle de la factura");
      }

      fetchDetalles();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar la paginación de la tabla
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para abrir el diálogo con los detalles del pedido
  const handleOpenDetalleDialog = (detalle) => {
    setDetalleDialog(detalle);
  };

  const handleCloseDetalleDialog = () => {
    setDetalleDialog(null);
  };

  return (
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{
          width: "90%",
          maxWidth: "100%",
          padding: { xs: "20px", md: "50px" },
          borderRadius: "30px",
        }}
      >
        <Container>
          <h1>Detalles de Factura</h1>
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              type="number"
              name="numDetalle"
              label="Número de Detalle"
              value={detalle.numDetalle}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
            />
            <TextField
              type="number"
              name="precioDetalleFactura"
              label="Precio"
              value={detalle.precioDetalleFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
            />
            <TextField
              type="number"
              name="cantidadDetalleFactura"
              label="Cantidad"
              value={detalle.cantidadDetalleFactura}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
            />
            <TextField
              label="ID Producto"
              name="productoIdProducto"
              value={productoSeleccionado}
              onChange={(e) => setProductoSeleccionado(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
              helperText="Ingresa la ID del producto"
              type="text"
            />

            <TextField
              label="ID Inventario"
              name="inventarioIdInventario"
              value={inventarioSeleccionado}
              onChange={(e) => setInventarioSeleccionado(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
            />

            <TextField
              label="ID Factura"
              name="facturaIdFactura"
              value={facturaSeleccionada}
              onChange={(e) => setFacturaSeleccionada(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              sx={{
                "& .MuiInputLabel-root": { fontSize: "1.2rem" },
                "& .MuiInputBase-input": { fontSize: "1.2rem" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, fontSize: "1.2rem" }}
            >
              {editingId ? "Actualizar" : "Crear"}
            </Button>
          </form>

          <Box mt={4}>
            <h2>Lista de Detalles</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detalles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((d) => (
                      <TableRow key={d._id}>
                        <TableCell>{d.precioDetalleFactura}</TableCell>
                        <TableCell>{d.cantidadDetalleFactura}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(d)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(d._id)}>
                            <Delete />
                          </IconButton>
                          <IconButton
                            onClick={() => handleOpenDetalleDialog(d)}
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={detalles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Container>
      </Box>

      {/* Diálogo de detalles */}
      <Dialog open={detalleDialog !== null} onClose={handleCloseDetalleDialog}>
        <DialogTitle>Detalles del Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Precio:</strong> {detalleDialog?.precioDetalleFactura}
            <br />
            <strong>Cantidad:</strong> {detalleDialog?.cantidadDetalleFactura}
            <br />
            <strong>ID Inventario:</strong>{" "}
            {detalleDialog?.inventarioIdInventario?._id}
            <br />
            <strong>ID Producto:</strong>{" "}
            {detalleDialog?.idProducto?._id}
            <br />
            <strong>ID Factura:</strong> {detalleDialog?.facturaIdFactura?._id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetalleDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetalleFactura;
