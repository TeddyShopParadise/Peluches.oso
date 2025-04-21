const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const path = require('path');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); 


require('dotenv').config();
// const https = require('https');

//Importar todas las rutas 
const uploadRoutes = require('./routes/upload_routes');

const catalogoRoutes = require('./routes/catalogos_routes');
const categoriaRoutes = require('./routes/categorias_routes');
const clienteRoutes = require('./routes/clientes_routes');
const compañiaRoutes= require('./routes/compañia_routes');
const detallesFacturaRoutes = require('./routes/detalleFacturas_routes');
const detallesPedidoRoutes = require('./routes/detallePedidos_routes');
const devolucionesRoutes = require('./routes/devoluciones_routes');
const empleadoRoutes = require('./routes/empleados_routes');
const facturasRoutes = require('./routes/facturas_routes');
const historialPrecioRoutes = require('./routes/historialPrecios_routes');
const inventarioRoutes = require('./routes/inventario_routes');
const metodoPagoRoutes = require('./routes/metodosPago_routes');
const movimientoRoutes = require('./routes/movimientos_routes');
const pedidoRoutes = require('./routes/pedidos_routes');
const productoRoutes = require('./routes/productos_routes');
const rolesRoutes = require('./routes/roles_routes');
const usuarioRoutes = require('./routes/usuarios_routes');
const loginRoute = require('./routes/login_routes');

// Middleware
const app = express();
const upload = multer();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://sa:PM02s8wkGc77jfO3@cluster0.hhmn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Conexión exitosa a MongoDB');

  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Cargar el certificado SSL y la clave privada
// Si usas HTTPS, descomenta las siguientes líneas y coloca tus certificados
/* 
const options = {
  key: fs.readFileSync('ruta/a/tu/clave-privada.key'),
  cert: fs.readFileSync('ruta/a/tu/certificado.crt')
};
*/
cloudinary.config({
  cloud_name: 'peluches',    
  api_key: '381838619856281',          
  api_secret: 'K3bBlaVv-cGj1A0LopGfOLstHs4'    
});

// Middleware adicional
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Integrar las rutas
app.use('/api/catalogos', catalogoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/compania', compañiaRoutes);
app.use('/api/detallesFactura', detallesFacturaRoutes);
app.use('/api/detallesPedido', detallesPedidoRoutes);
app.use('/api/devoluciones', devolucionesRoutes);
app.use('/api/empleado', empleadoRoutes);
app.use('/api/factura', facturasRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/historialPrecio', historialPrecioRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/metodoPago', metodoPagoRoutes);
app.use('/api/movimiento', movimientoRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/auth', loginRoute);
// Puerto
const port = process.env.PORT || 3000;

// Si usas HTTP:
http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP corriendo en http://localhost:${port}/api-docs/#/`);
});

