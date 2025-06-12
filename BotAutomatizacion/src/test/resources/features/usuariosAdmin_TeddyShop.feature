# language: es
# author: AlejandroCastro

Característica: Administración de Usuarios

  Como administrador de TeddyShop
  Quiero registrar nuevos usuarios en la página de gestión de usuarios
  Para que puedan acceder al sistema según su rol asignado

  @crearUsuario

  Escenario: Crear nuevo usuario exitosamente
    Dado que el administrador está en la página de gestión de usuarios
    Cuando registra un nuevo usuario con los datos:
      | Email          | contrasena | nombreUsuario |
      | user1@test.com | Password12 | test_user     |
    Entonces verifica que el usuario se creó correctamente
      | Email          | contrasena | nombreUsuario |
      | user1@test.com | Password12 | test_user     |