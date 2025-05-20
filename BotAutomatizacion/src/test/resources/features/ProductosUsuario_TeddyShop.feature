#language:es
  #author:Andres_Espinosa

Característica: Visualización en la página de Productos en la vista de usuarios de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar los productos en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacionproductos

  Escenario: Verificar la visualización exitosa en la página de Productos en la vista de usuarios de TeddyShop
    Dado que el usuario se encuentra en la pagina de productos en la vista de usuarios de TeddyShop
    Cuando ingrese correctamente a la página productos usuario
    Entonces se debe verificar que el usuario haya visualizado correctamente los productos disponibles de TeddyShop
