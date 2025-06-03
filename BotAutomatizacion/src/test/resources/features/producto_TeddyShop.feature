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


  @visualizacionproductosAdministrador
  Escenario: Verificar la visualización exitosa en la página de Productos
    Dado que el usuario se encuentra en la pagina de productos en la vista de administrador de TeddyShop
    Cuando el usuario registra un nuevo producto con los siguientes datos:
      | estiloProducto | disponibilidadProducto | tamañoProducto | imagen            |
      | FEEOOO         | 15                     | Mediano        | http://imagen.jpg |
    Entonces se debe verificar que el producto se haya creado correctamente
