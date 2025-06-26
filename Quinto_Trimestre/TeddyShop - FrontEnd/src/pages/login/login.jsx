import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../utils/apiConfig';
import Swal from 'sweetalert2';
import './Login.css';

const apiUrl = getApiUrl();

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para validar y decodificar token
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  };

  // Función para verificar si el token es válido 
  const isTokenValid = (decodedToken) => {
    if (!decodedToken || !decodedToken.exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  };

  // Función para limpiar datos de autenticación
  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    if (typeof setIsAuthenticated === 'function') {
      setIsAuthenticated(false);
    }
  };

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (!email.trim() || !contraseña.trim()) {
      setMessage('Por favor, ingresa el correo electrónico y la contraseña.');
      setOpen(true);
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Por favor, ingresa un correo electrónico válido.');
      setOpen(true);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          contraseña: contraseña.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Decodificar y validar token
        const decodedToken = decodeToken(data.token);
        
        if (!decodedToken) {
          setMessage('Error al procesar la respuesta del servidor');
          setOpen(true);
          setLoading(false);
          return;
        }

        if (!isTokenValid(decodedToken)) {
          setMessage('El token recibido ha expirado');
          setOpen(true);
          setLoading(false);
          return;
        }

        // Guardar token
        localStorage.setItem('authToken', data.token);

        // Verificar roles del usuario
        const userRoles = Array.isArray(decodedToken.roles) ? decodedToken.roles : [];
        
        if (userRoles.length === 0) {
          setMessage('Usuario sin roles asignados. Contacte con soporte.');
          clearAuthData();
          setOpen(true);
          setLoading(false);
          return;
        }

        // Determinar rol principal
        let userRole = null;
        if (userRoles.includes('Administrador')) {
          userRole = 'Administrador';
        } else if (userRoles.includes('Empleado')) {
          userRole = 'Empleado';
        }

        if (userRole) {
          // Marcar como autenticado INMEDIATAMENTE
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(true);
          }
          
          setMessage(`Bienvenido, ${decodedToken.username || 'Usuario'}`);
          setOpen(true);
          
          // Forzar recarga completa de la página después de un breve delay
          setTimeout(() => {
            window.location.href = '/home';
          }, 1000);
        } else {
          setMessage('Rol no reconocido. Contacte con soporte.');
          clearAuthData();
          setOpen(true);
        }
      } else {
        setMessage(data.message || 'Credenciales incorrectas');
        setOpen(true);
      }
    } catch (error) {
      // Mensajes más específicos según el tipo de error
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setMessage('No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        setMessage('Error inesperado. Intente nuevamente.');
      }
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkExistingAuth = () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) return;

      const decodedToken = decodeToken(token);
      
      if (!decodedToken || !isTokenValid(decodedToken)) {
        // Token inválido o expirado
        clearAuthData();
        return;
      }

      // Token válido, marcar como autenticado y redirigir con recarga
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(true);
      }
      window.location.href = '/home';
    };

    checkExistingAuth();
  }, [setIsAuthenticated]);

  // Función para cerrar el snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin} className="form">
        <h1 className="title">Inicio de Sesión</h1>
        
        <div className="inp">
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            fullWidth
            disabled={loading}
            autoComplete="email"
            error={open && message.includes('correo')}
          />
          <i className="fa-solid fa-user"></i>
        </div>
        
        <div className="inp">
          <TextField
            label="Contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="input"
            fullWidth
            disabled={loading}
            autoComplete="current-password"
            error={open && message.includes('contraseña')}
          />
          <i className="fa-solid fa-lock"></i>
        </div>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit"
          disabled={loading}
          fullWidth
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>
      
      <div className="banner">
        <h1 className="wel_text">Bienvenidos</h1>
      </div>
      
      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={message.includes('Bienvenido') ? 'success' : 'error'}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;