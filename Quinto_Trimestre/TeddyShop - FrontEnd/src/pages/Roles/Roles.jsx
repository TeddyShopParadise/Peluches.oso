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
  Snackbar,
  Alert,
  Box,
  Switch,
  FormControlLabel,
  TablePagination
} from "@mui/material";
import Swal from 'sweetalert2';
import { Edit, Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import '../PagesStyle.css';
import { getApiUrl } from '../../utils/apiConfig'
const apiUrl = getApiUrl();
console.log("Url almacenada: ",apiUrl);
import useApiRequest from '../../hooks/useApiRequest';


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
  const { makeRequest } = useApiRequest();
  
  

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
  if (!role.nombre) {
    await Swal.fire({
      icon: 'error',
      title: 'Campo incompleto',
      text: 'Por favor, ingresa el nombre del rol',
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

  await makeRequest({
    url: `${apiUrl}/roles`,
    method: 'POST',
    data: role,
    confirm: {
      title: 'Crear nuevo rol',
      text: '¿Estás seguro de que deseas crear este rol?',
      icon: 'question',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos creando el rol'
    },
    success: {
      title: '¡Rol creado!',
      text: 'El rol se ha creado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchRoles();
      setRole({ nombre: '', estado: true });
    }
  });
};

const actualizarRol = async () => {
  if (!currentId) return;

  await makeRequest({
    url: `${apiUrl}/roles/${currentId}`,
    method: 'PUT',
    data: role,
    confirm: {
      title: 'Actualizar rol',
      text: '¿Estás seguro de que deseas actualizar este rol?',
      icon: 'question',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    },
    loading: {
      title: 'Procesando...',
      html: 'Estamos actualizando el rol'
    },
    success: {
      title: '¡Rol actualizado!',
      text: 'El rol se ha actualizado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: () => {
      fetchRoles();
      setRole({ nombre: '', estado: true });
      setIsEditing(false);
      setCurrentId(null);
    }
  });
};

const EliminarRol = async (id) => {
  await makeRequest({
    url: `${apiUrl}/roles/${id}`,
    method: 'DELETE',
    confirm: {
      title: 'Eliminar rol',
      text: '¿Estás seguro de que deseas eliminar este rol? Esta acción no se puede deshacer',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: `
        rgba(0,0,0,0.7)
        url("/images/warning.gif")
        center top
        no-repeat
      `
    },
    loading: {
      title: 'Eliminando...',
      html: 'Estamos eliminando el rol'
    },
    success: {
      title: '¡Rol eliminado!',
      text: 'El rol se ha eliminado correctamente',
      timer: 2000,
      timerProgressBar: true
    },
    error: {
      title: 'Error',
      footer: '<a href="/ayuda">¿Necesitas ayuda?</a>'
    },
    onSuccess: fetchRoles
  });
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
           <Button variant="outlined" color="secondary" onClick={resetRoleForm}>
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
