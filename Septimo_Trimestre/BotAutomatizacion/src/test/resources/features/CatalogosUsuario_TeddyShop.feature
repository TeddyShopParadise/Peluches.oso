#language:es
  #author:Andres_Espinosa

Característica: Visualización en la página de catalogos en la vista de usuarios de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar los catalogos en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacioncatalogos

  Escenario: Verificar la visualización exitosa en la página de catalogos en la vista de usuarios de TeddyShop
    Dado que el usuario se encuentra en la pagina principal de TeddyShop
    Cuando ingrese correctamente a la seccion catalogos usuario desde el menú de productos
    Entonces debería visualizar las categorías disponibles y los productos correspondientes