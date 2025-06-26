import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import LinkBehavior from './LInkBehavior';
import logoTeddyShop from '../../assets/img/LogoTeddyShop.jpg';
import Login from '../../pages/login/login';

export default function Navbar() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Estados para controlar submenús en el drawer
  const [openUsuarios, setOpenUsuarios] = useState(false);
  const [openProductos, setOpenProductos] = useState(false);
  const [openPedidos, setOpenPedidos] = useState(false);
  const [openVerProductos, setOpenVerProductos] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.roles && decodedToken.roles[0]);
    }
  }, [isAuthenticated]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/');
    setDrawerOpen(false);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUserRole(decodedToken.roles && decodedToken.roles[0]);
    setIsAuthenticated(true);
    setLoginModalOpen(false); 
    navigate('/'); 
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box sx={{ width: 320, height: '100%', backgroundColor: '#f8f9fa' }}>
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #9c27b0, #e1bee7)',
        color: 'white',
        textAlign: 'center'
      }}>
        <img 
          src={logoTeddyShop} 
          alt="TeddyShop Logo" 
          style={{ height: '50px', marginBottom: '10px' }} 
        />
        <Typography variant="h6" fontWeight="bold">
          TeddyShop
        </Typography>
        {isAuthenticated && (
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            {userRole || 'Usuario'}
          </Typography>
        )}
      </Box>

      <List sx={{ px: 1, py: 2 }}>
        <ListItem 
          button 
          onClick={() => handleNavigation('/Home')}
          sx={{ 
            borderRadius: 2, 
            mb: 1,
            '&:hover': { backgroundColor: '#e3f2fd' }
          }}
        >
          <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem 
          button 
          onClick={() => setOpenVerProductos(!openVerProductos)}
          sx={{ 
            borderRadius: 2, 
            mb: 1,
            backgroundColor: openVerProductos ? '#e8f5e8' : 'transparent',
            '&:hover': { backgroundColor: '#e3f2fd' }
          }}
        >
          <ListItemIcon><StoreIcon color="success" /></ListItemIcon>
          <ListItemText primary="Menú de Productos" />
          {openVerProductos ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openVerProductos} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem 
              button 
              onClick={() => handleNavigation('/catalogos-usuario')}
              sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
            >
              <ListItemText primary="Catálogos" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigation('/productos-usuario')}
              sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
            >
              <ListItemText primary="Productos" />
            </ListItem>
          </List>
        </Collapse>

        {userRole === 'Administrador' && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: '#666', fontWeight: 'bold' }}>
              ADMINISTRACIÓN
            </Typography>

          

            {/* Administrador de Usuarios */}
            <ListItem 
              button 
              onClick={() => setOpenUsuarios(!openUsuarios)}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                backgroundColor: openUsuarios ? '#e8f5e8' : 'transparent',
                '&:hover': { backgroundColor: '#e3f2fd' }
              }}
            >
              <ListItemIcon><AdminPanelSettingsIcon color="warning" /></ListItemIcon>
              <ListItemText primary="Administrar Usuarios" />
              {openUsuarios ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/roles')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Roles" />
                </ListItem>
                 
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/usuarios')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Usuarios" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/empleado')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Empleados" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/cliente')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Clientes" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/compania')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Compañía" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        {/* Menús de Administrador y Empleado */}
        {(userRole === 'Administrador' || userRole === 'Empleado') && (
          <>
            {/* Administrador de Productos */}
            <ListItem 
              button 
              onClick={() => setOpenProductos(!openProductos)}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                backgroundColor: openProductos ? '#f3e5f5' : 'transparent',
                '&:hover': { backgroundColor: '#e3f2fd' }
              }}
            >
              <ListItemIcon><InventoryIcon color="secondary" /></ListItemIcon>
              <ListItemText primary="Administrar Productos" />
              {openProductos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openProductos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/inventario')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Inventario" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/catalogo')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Catálogos" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/productos')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Productos" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/categoria')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Categorías" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/HistorialPrecio')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Historial de Precios" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/movimiento')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Movimientos" />
                </ListItem>
              </List>
            </Collapse>

            {/* Gestión de Pedidos */}
            <ListItem 
              button 
              onClick={() => setOpenPedidos(!openPedidos)}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                backgroundColor: openPedidos ? '#fff8e1' : 'transparent',
                '&:hover': { backgroundColor: '#e3f2fd' }
              }}
            >
              <ListItemIcon><ShoppingCartIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Gestión de Pedidos" />
              {openPedidos ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPedidos} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/pedido')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Pedidos" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/Factura')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Facturas" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/metodoPago')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Método de Pago" />
                </ListItem>
                <ListItem 
                  button 
                  onClick={() => handleNavigation('/devoluciones')}
                  sx={{ pl: 4, borderRadius: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <ListItemText primary="Devoluciones" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Autenticación */}
        {!isAuthenticated ? (
          <ListItem 
            button 
            onClick={() => handleNavigation('/login')}
            sx={{ 
              borderRadius: 2,
              backgroundColor: '#e8f5e8',
              '&:hover': { backgroundColor: '#c8e6c9' }
            }}
          >
            <ListItemIcon><LoginIcon color="success" /></ListItemIcon>
            <ListItemText primary="Iniciar sesión" />
          </ListItem>
        ) : (
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{ 
              borderRadius: 2,
              backgroundColor: '#ffebee',
              '&:hover': { backgroundColor: '#ffcdd2' }
            }}
          >
            <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="relative" 
        sx={{
          background: "linear-gradient(135deg, rgba(150, 50, 150, 0.9), rgba(221, 160, 221, 0.5), rgba(150, 50, 150, 0.9), rgba(255, 182, 193, 0.7))",
          backdropFilter: "blur(8px)",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          backgroundSize: "200% 200%"
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2F2F2F' }}>
            <Button
              component={RouterLink}
              to="/Home"
              size="large"
              color="inherit"
              sx={{ textTransform: 'none' }}
            >
              <img 
                src={logoTeddyShop} 
                alt="TeddyShop Logo" 
                style={{ height: '40px', marginRight: '10px' }} 
              />
              <Typography variant="h5" component="span" sx={{ color: '#2F2F2F', fontWeight: 'bold' }}>
                TeddyShop
              </Typography>
            </Button>
          </Typography>

          {/* Botón de login/logout en desktop */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                component={LinkBehavior}
                to="/login"
                startIcon={<LoginIcon />}
                sx={{ color: '#2F2F2F', fontSize: '16px' }}
              >
                Iniciar sesión
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ color: '#2F2F2F', fontSize: '16px' }}
              >
                Cerrar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 320,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Modal open={loginModalOpen} onClose={handleLoginClose}>
        <Box>
          <Login onClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />
        </Box>
      </Modal>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}