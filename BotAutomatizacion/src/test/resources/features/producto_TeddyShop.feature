# language: es
# author: Joseph_Socha

Característica: Gestión de productos en la vista de administrador de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar y registrar productos
  Para poder gestionar el catálogo de forma eficiente

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de TeddyShop
    Cuando ingrese las credenciales correctas (usuario y contrasena)
      | usuarios                | clave        |
      | angelabonilla@gmail.com | Peluches.oso |


  @registroProductoConInventario
  Escenario: Registrar un producto con su inventario inicial
    Dado que el usuario se encuentra en la pagina de productos en la vista de administrador de TeddyShop
    Cuando el usuario registra un nuevo producto con los siguientes datos:
      | estiloProducto | disponibilidadProducto | tamañoProducto | imagen            |
      | Oso 80cm         | 10                    | 80cm        | http://imagen.jpg |
    Y el usuario registra el inventario del producto con los siguientes datos:
      | stockInicial | stockMinimo | stockMaximo | precioVenta | precioCompra |
      | 10           | 5           | 30          | 128000      | 100000        |
    Entonces se debe verificar que el inventario se haya creado correctamente

