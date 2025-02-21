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
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
  Box,
  Select,
  Switch,
  MenuItem,
  FormControl,
  FormControlLabel,
  TablePagination
} from "@mui/material";
import Swal from 'sweetalert2';
import { Edit, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [role, setRole] = useState({ nombre: "", estado: true });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");
  const [sortOrder, setSortOrder] = useState("asc");

  const getAuthToken = () => {
    const token = localStorage.getItem('authToken');
    return token;
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiUrl}/roles`);
      if (!response.ok) {
        throw new Error('Error al obtener los roles');
      } 
      const data = await response.json();
      setRoles(data);
      setFilteredRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setSnackbarMessage("Error al obtener los roles");
      setOpenSnackbar(true);
    }
  };

  const crearRol = async () => {
    console.log("Datos enviados:", role); 
    try {
      const response = await fetch(`${apiUrl}/roles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el rol');
      }
  
      fetchRoles();
      setRole({ nombre: '', estado: true });
      setSnackbarMessage("Rol creado correctamente");
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al crear el rol:', error);
      setSnackbarMessage(error.message || "Error al guardar el rol");
      setOpenSnackbar(true);
    }
  };
  
  const actualizarRol = async () => {
    if (!currentId) return;
  
    try {
      const response = await fetch(`${apiUrl}/roles/${currentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(role),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el rol');
      }
  
      fetchRoles();
      setRole({ nombre: '', estado: true });
      setIsEditing(false);
      setCurrentId(null);
      setSnackbarMessage("Rol actualizado correctamente");
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      setSnackbarMessage(error.message || "Error al guardar el rol");
      setOpenSnackbar(true);
    }
  };
  const resetRoleForm = () => {
    setRole({ nombre: "", estado: true });
    setIsEditing(false);
    setCurrentId(null);
  };
  
  const handleSaveRole = () => {
    isEditing ? actualizarRol() : crearRol();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setRole(prevRole => ({
      ...prevRole,
      [name]: name === "estado" ? Boolean(value) : value  
    }));
  };
  
    const handleEstadoChange = (event) => {
      setRole({ ...role, estado: Boolean(event.target.checked) });
    };

  const handleEditClick = (role) => {
    setRole({ nombre: role.nombre, estado: role.estado });
    setIsEditing(true);
    setCurrentId(role._id);
  };

  const EliminarRol = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${apiUrl}/roles/${id}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            fetchRoles();
            Swal.fire("Eliminado", "El rol ha sido eliminado correctamente.", "success");
          } else {
            Swal.fire("Error", "No se pudo eliminar el rol.", "error");
          }
        } catch (error) {
          console.error('Error al eliminar el rol:', error);
          Swal.fire("Error", "Ocurrió un problema al eliminar el rol.", "error");
        }
      }
    });
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredRoles(
      roles.filter((role) =>
        role.nombre.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSort = (field) => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setSortBy(field);
    setFilteredRoles(
      [...filteredRoles].sort((a, b) => {
        if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <Box className="BoxInicial">
      <Box className="Box"
        sx={{ 
          width: "90%", 
          maxWidth: "100%", 
          padding: { xs: "20px", md: "50px" }, 
          borderRadius: "30px", 
        }}>
        <Container>
          <h1>Gestión de Roles</h1>
          <form noValidate autoComplete="off">
            <TextField label="Nombre del Rol" name="nombre" value={role.nombre} onChange={handleInputChange} fullWidth margin="normal" required />
            <FormControlLabel
            control={<Switch checked={role.estado} onChange={handleEstadoChange} />}
            label={role.estado ? "Activo" : "Inactivo"}
            />
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2  }}>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: "8px", padding: "8px 18px" }}
            onClick={handleSaveRole}
          >
            {isEditing ? "Actualizar Rol" : "Crear Rol"}
          </Button>
          <Button 
           variant="outlined" 
           color="secondary" 
           sx={{ borderRadius: "8px", padding: "8px 18px" }}
           onClick={resetRoleForm}>
            Cancelar
          </Button>
        </Box>

          </form>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <h2>Roles</h2>
            <TextField label="Buscar por nombre" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} style={{ width: 250 }} />
          </Box>
          <TableContainer component={Paper} style={{ marginTop: 20, maxHeight: 500, overflowY: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("nombre")}>
                      Nombre
                      {sortBy === "nombre" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" onClick={() => handleSort("estado")}>
                      Estado
                      {sortBy === "estado" && (sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />)}
                    </Box>
                  </TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                  <TableRow key={r._id}>
                    <TableCell>{r.nombre}</TableCell>
                    <TableCell>{r.estado ? "Activo" : "Inactivo"}</TableCell>
                    
                    <TableCell>
                    <IconButton 
                      onClick={() => handleEditClick(r)} 
                      color="primary" 
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      onClick={() => EliminarRol(r._id)} 
                      sx={{ color: "red", "&:hover": { color: "darkred" } }}
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
            rowsPerPageOptions={[10]}
            component="div"
            count={filteredRoles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Roles;
