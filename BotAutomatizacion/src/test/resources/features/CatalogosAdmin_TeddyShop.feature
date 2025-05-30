#language:es
#author:JordanCastaneda

Característica: Visualización de la pagina de Catalogos con el rol de administrador de TeddyShop
  Como Administrador de TeddyShop
  Quiero visualizar los catalogos con su informacion en la pagina de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacionCatalogosAdministrador

  Escenario: Verificar la visualización exitosa en la pagina de Catalogos con el rol de administrador de TeddyShop
    Dado que el usuario se encuentra en la pagina de Catalogos con el rol de administrador de TeddyShop
    Cuando el usuario registra un nuevo Catalogo con los siguientes datos:
      | nombreCatalogo         | descripcionCatalogo                     |
      | Automatizacion prueba5 | Descripcion de prueba de automatizacion |
    Entonces se debe verificar que el Catalogo se haya creado correctamente