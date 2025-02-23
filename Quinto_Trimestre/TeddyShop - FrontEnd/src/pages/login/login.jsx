import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../../utils/apiConfig';
import './Login.css';

const apiUrl = getApiUrl();
console.log("URL de la API:", apiUrl); 

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !contraseña) {
      setMessage('Por favor, ingresa el correo electrónico y la contraseña.');
      setOpen(true);
      return;
    }

    setLoading(true);
    const body = { email, contraseña };
    console.log('Cuerpo de la solicitud:', body); 

    try {
      // Realizar la solicitud al servidor
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      // Verifica si la respuesta fue exitosa
      const data = await response.json();
      console.log('Respuesta de la API:', data); 

      setLoading(false);

      // Si la respuesta es exitosa (status 200-299)
      if (response.ok) {
        // Guardamos el token en el almacenamiento local
        localStorage.setItem('authToken', data.token);

        // Decodificamos el token
        let decodedToken;
        try {
          decodedToken = JSON.parse(atob(data.token.split('.')[1]));
          console.log("Token decodificado:", decodedToken); 
        } catch (e) {
          setMessage('Error al decodificar el token');
          setOpen(true);
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(false);
          }
          return;
        }
        // Verificar los roles del usuario decodificado
        const userRoles = Array.isArray(decodedToken.roles) ? decodedToken.roles : [];
        console.log("Roles del usuario:", userRoles); 

        let userRole = null;
        if (userRoles.includes('Administrador')) {
          userRole = 'Administrador';
        } else if (userRoles.includes('Empleado')) {
          userRole = 'Empleado';
        }
        if (userRole) {
          setMessage(`Login exitoso como ${userRole.toLowerCase()}`);
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(true); 
          }
          navigate(userRole === 'Administrador' ? '/home' : '/home');
            window.location.reload();
        } else {
          setMessage('Rol desconocido. Contacte con soporte.');
          if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(false);
          }
        }
        setOpen(true);
      } else {
        // Si la respuesta no es exitosa, muestra el mensaje de error
        setMessage(data.message || 'Error al iniciar sesión');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setMessage('Error al conectar con el servidor');
      setOpen(true);
      setLoading(false);
    }
  };

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Token decodificado:', decodedToken);
  
        // Marca como autenticado y redirige
        setIsAuthenticated(true);
        setIsRedirecting(true);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        localStorage.removeItem('authToken'); // Elimina un token inválido
      }
    }
  }, [setIsAuthenticated]);
  
  if (isRedirecting) {
    navigate('/home', { replace: true });
    return null;
  }
  
  return (
    <div className="wrapper">
      <form onSubmit={handleLogin} className="form">
        <h1 className="title">Inicio</h1>
        <div className="inp">
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            fullWidth
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
          />
          <i className="fa-solid fa-lock"></i>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </form>
      <div className="banner">
        <h1 className="wel_text">Bienvenidos</h1><br />
        <p className="para"></p>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={message.includes('exitoso') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
