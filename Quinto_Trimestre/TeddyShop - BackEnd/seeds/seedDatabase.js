//Inicializa las semillas para llamarlas en el index
const seedCompañia = require('./compañia_seed.js');
const empleadosSeed = require('./empleado_seed.js');
const catalogoSeed = require('./catalogo_seed.js');
const clienteSeed = require('./cliente_seed.js');
const categoriaSeed = require('./categoria_seed.js');
const detalleFacturaSeed = require('./detalleFactura_seed');
const facturaSeed = require('./factura_seed.js');
const historialPrecioSeed = require('./historialPrecio_seed.js');
const rolesSeed = require('./roles_seed.js');
const usuarioSeed = require('./usuario_seed.js');
const detallePedidoSeed = require('./detallePedido_seed.js')

async function runAllSeeds() {
  try {
    console.log("Iniciando proceso de semillas...");

   //await seedCompañia;
  // await empleadosSeed;
   // await catalogoSeed;
  //  await clienteSeed;
  //  await categoriaSeed;
  //  await detalleFacturaSeed;
  //  await detallePedidoSeed;
    //await facturaSeed;
   //await historialPrecioSeed;
   //await rolesSeed;
  //  await usuarioSeed;
    
    console.log("Semillas completadas correctamente.");
  } catch (error) {
    console.error("Error al ejecutar semillas:", error);
  }
}

module.exports = runAllSeeds;
