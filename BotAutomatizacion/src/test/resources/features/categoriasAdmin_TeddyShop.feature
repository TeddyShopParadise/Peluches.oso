#language:es
#author:Andres_Espinosa

Característica: Visualización en la página de Categoria con el rol de administrador de TeddyShop
  Como Administrador de TeddyShop
  Quiero visualizar las categorias en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacionCategoriasAdministrador

  Escenario: Verificar la visualización exitosa en la página de Categorias en la vista de administrador de TeddyShop
    Dado que el usuario se encuentra en la pagina de Categorias en la vista de administrador de TeddyShop
    Cuando el usuario registra una nueva Categoria con los siguientes datos:
      | nombreCategoria | descripcionCategoria                  |
      | Prueba          | Descripcion de la categoria de prueba |
    Entonces se debe verificar que la Categoria se haya creado correctamente