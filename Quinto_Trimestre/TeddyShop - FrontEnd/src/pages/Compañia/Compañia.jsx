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
    Box,
    TablePagination,
    Typography,
    Tooltip,
    Chip,
    FormControlLabel,
    Switch,
    Snackbar, 
    Alert,
    FormControl,
    InputLabel,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem
  } from '@mui/material';
  import sortBy from 'lodash/sortBy';
  import { Edit, Delete, ListAlt, ArrowUpward, ArrowDownward, Info, AddCircle, Save, Cancel, Add, Clear, Search  } from '@mui/icons-material';
  import '../PagesStyle.css';
  import Swal from 'sweetalert2';
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


      
    const verDetalles = (compania) => {
      setSelectedCompania(compania);
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
      setSelectedCompania(null);
    };

   

    useEffect(() => {
      fetchCompanias();
    }, []);

    return (
      <Box className="BoxInicial">
        <Box className="Box"
          sx={{
            width: '90%',
            maxWidth: '900px',
            padding: { xs: '20px', md: '30px' },
            borderRadius: '30px',
            margin: '0 auto',
            backgroundColor: '#fffafc',
            boxShadow: '0 8px 24px rgba(248, 200, 220, 0.3)',
            border: '2px solid #f8c8dc',
          }}
        >
          <Container>
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: '30px',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '25%',
                  width: '50%',
                  height: '4px',
                  background: 'linear-gradient(90deg, #fce4ec 0%, #f8c8dc 50%, #fce4ec 100%)',
                  borderRadius: '10px',
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                }}
              >
                Gestión de Compañías
              </Typography>
            </Box>
    
           
            <Paper
              elevation={2}
              sx={{
                padding: '20px',
                borderRadius: '20px',
                marginBottom: '20px',
                backgroundColor: '#fff0f5',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, #f8c8dc 0%, #f8bbd0 50%, #f8c8dc 100%)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '15px',
                  color: '#b04e6f',
                  fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <ListAlt fontSize="small" /> Lista de Compañías
              </Typography>
    
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  border: '1px solid #f8c8dc',
                  overflowX: 'auto',

                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#ffeef3' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>NIT</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          onClick={() => sortCompanias('nombreEmpresa')}
                          sx={{ cursor: 'pointer' }}
                        >
                          Nombre
                          {sortBy === 'nombreEmpresa' &&
                            (sortOrder === 'asc' ? (
                              <ArrowUpward fontSize="small" />
                            ) : (
                              <ArrowDownward fontSize="small" />
                            ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companias.map((comp) => (
                      <TableRow
                        key={comp._id}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#fff0f5',
                          },
                        }}
                      >
                        <TableCell>{comp.NIT}</TableCell>
                        <TableCell>{comp.nombreEmpresa}</TableCell>
                        <TableCell>{comp.direccionEmpresa}</TableCell>
                          <TableCell>{comp.telefonoEmpresa}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
    
            {selectedCompania && (
              <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                PaperProps={{
                  sx: {
                    borderRadius: '20px',
                    backgroundColor: '#fff5f7',
                    border: '1px solid #f8c8dc',
                  }
                }}
              >
                <DialogTitle
                  sx={{
                    backgroundColor: '#ffeef3',
                    color: '#b04e6f',
                    fontFamily: '"Baloo 2", "Comic Sans MS", cursive',
                    borderBottom: '1px solid #f8c8dc',
                  }}
                >
                  Detalles de la Compañía
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>NIT:</strong> {selectedCompania.NIT}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Nombre:</strong> {selectedCompania.nombreEmpresa}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Dirección:</strong> {selectedCompania.direccionEmpresa}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Teléfono:</strong> {selectedCompania.telefonoEmpresa}
                    </Typography>
                  </Box>
                </DialogContent>
                <DialogActions
                  sx={{
                    backgroundColor: '#ffeef3',
                    borderTop: '1px solid #f8c8dc',
                  }}
                >
                  <Button
                    onClick={handleCloseDialog}
                    sx={{
                      color: '#f48fb1',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 143, 177, 0.1)',
                      },
                    }}
                  >
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
