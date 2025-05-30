#language:es
#author:MaGs
Característica: Registro de Historial de Precios en TeddyShop
  Como Empleado o Administrador de TeddyShop
  Quiero registrar y visualizar el historial de precios de un producto en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  @historialPrecio
  Escenario: Registrar un nuevo historial de precio exitosamente
    Dado que el usuario se encuentra en la página de Historial de Precios en la vista de administrador de TeddyShop
    Cuando el usuario registra un nuevo Historial de Precio con los siguientes datos:
      | PrecioHistorialPrecio | FechaInicio  | FechaFinal   |
      | 15000                 | 01-06-2024   | 05-12-2024   |
    Entonces se debe verificar que el Historial de Precio se haya creado correctamente