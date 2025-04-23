import React from 'react';
import { Dialog, DialogContent, Button, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@mui/material';
import { LocationOn, Phone, Print } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FacturaPDFExport from './FacturaPDFExport';


const FacturaPDF = ({ factura, open, onClose, pedido, compania }) => {
  console.log("Datos de la factura:", factura); 
  if (!factura || !pedido) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ 
        backgroundColor: '#f8f9fa', 
        p: { xs: 2, md: 4 },
        '& .MuiDialogContent-root': {
          overflowY: 'visible'
        }
      }}>
        {/* Encabezado responsivo */}
        <Box textAlign="center" mb={4} sx={{
          backgroundColor: 'white',
          py: { xs: 2, md: 3 },
          px: { xs: 1, md: 3 },
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Typography variant="h4" sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 1,
            textTransform: 'uppercase',
            fontSize: { xs: '1.75rem', md: '2.125rem' }
          }}>
            {compania?.nombreEmpresa}
          </Typography>
          
          <Grid container spacing={1} justifyContent="center" sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                {compania?.direccionEmpresa}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                {compania?.telefonoEmpresa}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ 
                fontWeight: 500,
                fontSize: { xs: '0.8rem', md: '0.875rem' }
              }}>
                NIT: {compania?.NIT?.toLocaleString('es-CO')}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Sección Cliente - Versión Responsive */}
        <Box mb={4} sx={{
          p: { xs: 2, md: 3 },
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: 'primary.main'
          }
        }}>
          <Typography variant="h6" sx={{
            color: 'primary.dark',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}>
            <LocationOn fontSize="small" />
            Datos del Cliente
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                pr: { md: 2 },
                borderRight: { md: '1px solid #eee' }
              }}>
                <Typography variant="body1" sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}>
                  {pedido?.nombreComprador} 
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {pedido?.numeroComprador}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                pl: { md: 2 },
                mt: { xs: 2, md: 0 }
              }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <LocationOn fontSize="small" color="primary" />
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 500 }}>Dirección:</Box> {pedido?.direccion}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1
                }}>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    <Box component="span" sx={{ fontWeight: 500 }}>Localidad:</Box> {pedido?.localidad}
                  </Typography>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    <Box component="span" sx={{ fontWeight: 500 }}>Barrio:</Box> {pedido?.barrio}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Tabla Responsive */}
        <Box mb={4} sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          overflowX: 'auto',
          boxShadow: 2
        }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{
              '& th': {
                color: '#7434B0FF',
                fontWeight: 'bold',
                fontSize: { xs: '0.875rem', md: '1rem' },
                whiteSpace: 'nowrap'
              }
            }}>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Tamaño</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio Unitario</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
  {factura.detallesFactura?.map((item, index) => (
    <TableRow key={index}>
      <TableCell sx={{ minWidth: 200 }}>
        <Typography sx={{ fontWeight: 500 }}>
          {/* Corregido para acceder correctamente a los datos del producto */}
          {item.idProducto?._id && `  ${item.idProducto._id}`}
        </Typography>
      </TableCell>
      
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          {item.idProducto?.tamañoProducto && `  ${item.idProducto.tamañoProducto}`}
      </TableCell>
      <TableCell align="right">{item.cantidadDetalleFactura}</TableCell>
      
      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
        ${typeof item.precioDetalleFactura === 'number' 
          ? item.precioDetalleFactura.toLocaleString("es-CO") 
          : parseFloat(item.precioDetalleFactura || 0).toLocaleString("es-CO")}
      </TableCell>
     
      <TableCell align="right" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        ${(parseFloat(item.precioDetalleFactura || 0) * (item.cantidadDetalleFactura || 1)).toLocaleString("es-CO")}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </Box>

        <Box sx={{
          backgroundColor: 'white',
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          boxShadow: 2
        }}>
          <Box textAlign="right" mb={3}>
            <Typography variant="h5" sx={{ 
              color: 'primary.main',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}>
              Total General: ${factura.detallesFactura?.reduce(
                (sum, item) => sum + (item.precioDetalleFactura * item.cantidadDetalleFactura), 
                0
              )?.toLocaleString('es-CO')}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
              Fecha: {new Date(factura.fechaCreacionFactura).toLocaleDateString()} - Hora: {factura.horaCreacionFactura}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="contained"
              startIcon={<Print />}
              sx={{
                backgroundColor: 'primary.dark',
                '&:hover': { backgroundColor: 'primary.main' },
                minWidth: { xs: '100%', sm: '160px' }
              }}
            >
              <PDFDownloadLink
                document={
                  <FacturaPDFExport 
                    factura={factura} 
                    pedido={pedido} 
                    compania={compania} 
                  />
                }
                fileName={`factura-${factura.idFactura}.pdf`}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                {({ loading }) => (loading ? 'Generando...' : 'Exportar PDF')}
              </PDFDownloadLink>
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.dark',
                '&:hover': { borderColor: 'primary.dark' },
                minWidth: { xs: '100%', sm: '120px' }
              }}
            >
              Cerrar
            </Button>
          </Box>
        </Box>

        {/* Footer Responsive */}
        <Box mt={4} textAlign="center" sx={{ color: 'text.secondary' }}>
          <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
            © {new Date().getFullYear()} {compania?.nombreEmpresa} - Todos los derechos reservados<br/>
            <Box component="span" sx={{ fontSize: '0.75rem' }}>
              Factura electrónica válida como documento tributario
            </Box>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FacturaPDF;