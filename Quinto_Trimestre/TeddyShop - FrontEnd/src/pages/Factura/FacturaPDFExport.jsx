import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import logo from '../../assets/img/LogoTeddyshop.jpg';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  header: {
    marginBottom: 15,
    borderBottom: '2px solid #7434B0',
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    marginBottom: 10,
  },
  empresaInfo: {
    textAlign: 'center',
    marginBottom: 5,
  },
  empresaNombre: {
    fontSize: 18,
    color: '#7434B0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  datosEmpresa: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#444',
  },
  facturaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  clienteSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  tabla: {
    width: '100%',
    marginVertical: 10,
  },
  tablaHeader: {
    flexDirection: 'row',
    backgroundColor: '#7434B0',
    color: 'white',
    padding: 6,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tablaRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
    padding: 6,
  },
  columnaProducto: {
    width: '40%',
    fontSize: 9,
  },
  columnaTamaño: {
    width: '20%',
    fontSize: 9,
    textAlign: 'right',
  },
  columnaPrecio: {
    width: '20%',
    fontSize: 9,
    textAlign: 'right',
  },
  columnaCantidad: {
    width: '20%',
    fontSize: 9,
    textAlign: 'right',
  },
  columnaTotal: {
    width: '20%',
    fontSize: 9,
    textAlign: 'right',
  },
  totalSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  }
});

const FacturaPDFExport = ({ factura, pedido, compania }) => {
  const subtotal = factura.detallesFactura?.reduce(
    (sum, item) => sum + item.precioDetalleFactura * item.cantidadDetalleFactura,
    0
  );
  const total = subtotal

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo y Encabezado */}
        <View style={styles.header}>
          <Image 
            src= {logo}
            style={styles.logo} 
          />
          <View style={styles.empresaInfo}>
            <Text style={styles.empresaNombre}>{compania?.nombreEmpresa}</Text>
            <Text style={styles.datosEmpresa}>
              {compania?.direccionEmpresa}{'\n'}
              Tel: {compania?.telefonoEmpresa} | NIT: {compania?.NIT}
            </Text>
          </View>
        </View>

        {/* Número de Factura y Fecha */}
        <View style={styles.facturaHeader}>
          <Text style={{ fontSize: 10 }}>
            Factura No: {factura?._id?.toString() || "N/A"}
          </Text>
          <Text style={{ fontSize: 10 }}>
            Fecha: {format(new Date(factura.fechaCreacionFactura), "dd/MM/yyyy", { locale: es })}
          </Text>
        </View>

        {/* Datos del Cliente */}
        <View style={styles.clienteSection}>
          <Text style={{ fontSize: 12, marginBottom: 5, color: '#7434B0' }}>CLIENTE</Text>
          <Text style={{ fontSize: 10 }}>
            {pedido.nombreComprador} 
            Tel: {pedido.numeroComprador}{'\n'}
            Dirección: {pedido.direccion}
          </Text>
        </View>

       {/* Tabla de Productos */}
<View style={styles.tabla}>
  <View style={styles.tablaHeader}>
    <Text style={styles.columnaProducto}>Producto</Text>
    <Text style={styles.columnaTamaño}>Tamaño</Text>
    <Text style={styles.columnaPrecio}>Precio Unitario</Text>
    <Text style={styles.columnaCantidad}>Cantidad</Text>
    <Text style={styles.columnaTotal}>Total</Text>
  </View>

  {factura.detallesFactura?.map((item, index) => {
    const precioUnitario = parseFloat(item.precioDetalleFactura || 0);
    const cantidad = item.cantidadDetalleFactura || 1;
    const total = precioUnitario * cantidad;

    return (
      <View key={index} style={styles.tablaRow}>
        <Text style={styles.columnaProducto}>
          {item.idProducto?._id || "Producto no especificado"}
        </Text>
        <Text style={styles.columnaTamaño}>
          {item.idProducto?.tamañoProducto || "-"}
        </Text>
        <Text style={styles.columnaPrecio}>
          ${precioUnitario.toLocaleString('es-CO')}
        </Text>
        <Text style={styles.columnaCantidad}>
          {cantidad}
        </Text>
        <Text style={styles.columnaTotal}>
          ${total.toLocaleString('es-CO')}
        </Text>
      </View>
    );
  })}
</View>

        {/* Totales */}
        <View style={styles.totalSection}>
          <Text style={{ fontSize: 10, textAlign: 'right' }}>
            Subtotal: ${subtotal?.toLocaleString('es-CO')}
          </Text>
          <Text style={{ fontSize: 12, textAlign: 'right', fontWeight: 'bold', marginTop: 5 }}>
            TOTAL: ${total?.toLocaleString('es-CO')}
          </Text>
        </View>

        {/* Pie de Página */}
        <View style={styles.footer}>
          <Text>¡Gracias por su compra! | Método de Pago: {pedido.metodoPago}</Text>
          <Text>© {new Date().getFullYear()} {compania?.nombreEmpresa} - Factura válida como documento tributario</Text>
        </View>
      </Page>
    </Document>
  );
};

export default FacturaPDFExport;