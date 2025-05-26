#language:es
    #author:JordanCastaneda

Característica: Visualización en la página de Inventario en la vista de administrador de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar los inventarios en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacioninventarios

  Escenario: Verificar la visualización exitosa en la página de Inventarios en la vista de administrador de TeddyShop
    Dado que el usuario se encuentra en la pagina de inventarios en la vista de administrador de TeddyShop
    Cuando ingrese correctamente a la página de inventario
    Entonces se debe verificar que el usuario haya visualizado correctamente los inventarios disponibles de TeddyShop
