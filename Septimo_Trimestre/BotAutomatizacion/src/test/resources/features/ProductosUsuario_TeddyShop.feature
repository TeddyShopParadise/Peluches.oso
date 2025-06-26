#language:es
  #author:Andres_Espinosa

Característica: Visualización en la página de Productos en la vista de usuarios de TeddyShop
  Como Usuario de TeddyShop
  Quiero visualizar los productos en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles según mi rol.

  Antecedentes:
    Dado que el usuario se encuentra en la pagina de inicio de sesion de TeddyShop
    Cuando ingrese las credenciales correctas (usuario y contrasena)
      | usuarios                | clave        |
      | angelabonilla@gmail.com | Peluches.oso |

  @visualizacionproductos

  Escenario: Verificar la visualización exitosa en la página de Productos en la vista de usuarios de TeddyShop
    Dado que el usuario se encuentra en la pagina de productos en la vista de usuarios de TeddyShop
    Cuando ingrese correctamente a la página productos usuario
      | nombrePaga | telefonoPaga | nombreRecibe | telefonoRecibe | direccion          | barrio        | localidad      |
      | Andres     | 3166701994   | Dayana       | 3158725015     | cra 21a #64-10 Sur | San Francisco | Ciudad Bolivar |
    Entonces se debe verificar que el usuario haya visualizado correctamente los productos disponibles de TeddyShop
      | nombrePaga | telefonoPaga | nombreRecibe | telefonoRecibe | direccion          | barrio        | localidad      |
      | Andres     | 3166701994   | Dayana       | 3158725015     | cra 21a #64-10 Sur | San Francisco | Ciudad Bolivar |
