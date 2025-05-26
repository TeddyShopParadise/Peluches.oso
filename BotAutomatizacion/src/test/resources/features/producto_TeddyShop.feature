#language:es
#author:JordanCastaneda

Característica: Visualización en la página de Producto en la vista de administrador de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar los productos en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacionproductosAdministrador

  Escenario: Verificar la visualización exitosa en la página de Productos en la vista de administrador de TeddyShop
    Dado que el usuario se encuentra en la pagina de productos en la vista de administrador de TeddyShop
    Cuando el usuario registra un nuevo producto con los siguientes datos:
      | estiloProducto | disponibilidadProducto | tamañoProducto | imagen            |
      | FEEOOO         | 15                     | Mediano        | http://imagen.jpg |
    Entonces se debe verificar que el producto se haya creado correctamente