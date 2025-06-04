#language:es
#author:Andres_Espinosa

Característica: Visualización en la página de Empleados con el rol de administrador de TeddyShop
  Como Administrador de TeddyShop
  Quiero visualizar los Empleados en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @visualizacionEmpleados

  Escenario: Verificar la visualización exitosa en la página de Empleados en la vista de administrador de TeddyShop
    Dado que el usuario se encuentra en la pagina de Empleados en la vista de administrador de TeddyShop
    Cuando el usuario registra un nuevo Empleado con los siguientes datos:
      | dni        | nombreEmpleado  | telefonoEmpleado |
      | 8762340981 | Andres Espinosa | 3166701994       |
    Entonces se debe verificar que el Empleado se haya creado correctamente
      | dni        | nombreEmpleado  | telefonoEmpleado |
      | 8762340981 | Andres Espinosa | 3166701994       |