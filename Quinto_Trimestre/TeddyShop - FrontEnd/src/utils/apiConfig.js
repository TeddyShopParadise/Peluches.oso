// src/utils/apiConfig.js

// Función para detectar si estamos en un Codespace
export const isInCodespace = () => {
  const hostname = window.location.hostname;
  
  // Verifica si el hostname contiene la estructura típica de un URL de Codespace
  return hostname.includes('github.dev') || hostname.includes('app.github.dev');
};

// Función para obtener la URL de la API
export const getApiUrl = () => {
  // Si estamos en Codespace, usamos la URL proporcionada por GitHub
  if (isInCodespace()) {
    // Usa la variable de entorno definida en el archivo .env (para Codespace)
    return 'https://refactored-space-funicular-6994j95j4j9v34wr-3000.app.github.dev/api';
  }
  
  // Si no estamos en Codespace, usamos la URL local
  return 'http://localhost:3000/api';
};
