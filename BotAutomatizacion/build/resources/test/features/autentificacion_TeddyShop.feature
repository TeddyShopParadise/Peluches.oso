#language:es
  #author:Andres_Espinosa

Característica: Autenticacion en la pagina de TeddyShop
  Como Empleado o Administrador de TeddyShop
  Quiero autenticarme en el portal de TeddyShop
  Para poder acceder al contenido y funcionalidades disponibles en mi rol.

  @autenticacion

  Escenario: Verificar la autenticacion exitosa en la pagina de TeddyShop
    Dado que el usuario se encuentra en la pagina de inicio de sesion de TeddyShop
    Cuando ingrese las credenciales correctas (usuario y contrasena)
      | usuarios | clave |
      | angelabonilla@gmail.com     | Peluches.oso   |
    Entonces se debe verificar que el usuario haya sido autenticado correctamente y redirigido a su pagina de inicio de TeddyShop