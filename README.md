# SearchHealthMovil


El proyecto Search Health es una aplicación que permite a los usuarios buscar centros médicos en la ciudad de Quito, permite la busqueda por nombre, sector o especialidades. Cada centro méedico cuenta con informaciónd de horarios de atención, datos de contacto, especialidades y redes sociales. Incluye una sección de visualización de la ubicación del centro médico en google maps y la posibilidad de añadir comentarios de tipo reseña en los centros médicos.


**Video demostrativo:**

Video explicativo de la realización del proyecto:
https://youtu.be/B_7Jyj7HssM

Sistema Web: https://youtu.be/lFrR-o_CwD0
Aplicaicón Móvil: https://youtu.be/llziqifWJJg

**Repositorios:**

Sistema Web: https://github.com/CarlosMaldonado1998/SearchHealthWeb
Aplicacion Móvil: https://github.com/BrendaArcentales/SearchHealthMovil
Link del despliegue de la aplicación: 
https://play.google.com/store/apps/details?id=io.ionic.searchHealth

**Realizado por:**

- Brenda Arcentales - [@BrendaArcentales](https://github.com/BrendaArcentales)
- Carlos Maldonado - [@CarlosMaldonado1998](https://github.com/CarlosMaldonado1998)
## 1. Herramientas de Desarrollo 

- **Next.js**


- **Ionic**


- **Firebase**


  
## 2. Estructura 

- Base de datos 


La base se encuentra almacenada en la plataforma de Cloud Firestore de Firabase y tiene la siguiente estructura:

![alt text](https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/database.png)


  
## 3. Metodología Scrum 

Se ha utilizado Scrum ya que nos permite realizar tareas de manera ágil teniendo como finalidad la entrega de valor en periodos cortos de tiempo. A continuación se muestran los sprints desarrollados en el proyecto Search Health. 

*Sprint 1*

- Iniciar sesión y recuperación de contraseña 

*Sprint 2*

- Registrar entros médicos 
- Visualizar listado de centro médicos
- Editar centros médicos 
- Visualizar listado de usuarios 
- Eliminar comentarios de centros médicos

**Sistema móvil**

*Sprint 3*
- Iniciar sesión 
- Registrar usuario 
- Recuperar de contraseña 
*Sprint 4* 
- Visualizar de centros médicos 
- Filtrar o buscar centros médicos
- Visualizar a detalle información de un centro médico
- Visualizar la ubicación de un centro médico en el mapa

*Sprint 5* 
- Agregar favoritos 
- Vizualizar lista de favoritos
- Editar lista de favoritos 

*Sprint 6*
- Agregar puntuación a un centro médico
- Agregar comentarios a centros médicos 
- Editar comentarios realizados. 

*Sprint 7* 
- Visualizar perfil de usuario 
- Visualizar guia de usuario

*Sprint 8*
- Pruebas del sistema web y movil 
- Despliegue de la aplicación web y movil 


  
## 4. Funcionalidad del sistema 

La aplicación web se encuentra en producción a la que podemos acceder mediante el siguiente enlace:
[Search Health](https://search-health-web.vercel.app/)

El repositorio de la aplicación móvil es el siguiente:

https://github.com/BrendaArcentales/SearchHealthMovil

#### *Sistema web*

**Administración de centros**

El usuario Administrador puede realizar las siguientes operaciones en el sistema web. 
- Añadir centros médicos
- Editar centros médicos
- Eliminar centros médicos
- Visualizar listado de centros médicos y comentarios 
- Eliminar comentarios de los centros médicos

<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/welcomeAdmin.png" width="500">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/medicalCentersWeb.png" width="500">

#### *Aplicación móvil*

**Inicio de sesión**

La aplicación cuenta con una sección de inició de sesión, registro de cuentas y recuperación de contraseñas. 

<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/login-.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/recoverMovil.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/registerMovil.png" width="300">

**Visualizar centros médicos** 

La aplicación cuenta con un listado de centros médicos, dobde se encuentra un buscador que permite filtrar los centros médicos por nombre, sector o especialides. 
El detalle de cada centro médico cuenta con información como horarios de atención, datos de contacto, especialidades y redes sociales. 

<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/list.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/medicalCenter.png" width="300">

**Sección de favoritos**

En el detalle de cada centro médico cuenta con un icono de estrella en el cual al dar clic se podra añadir dicho centro médico al listado de favoritos, en el listado de favoritos podremos filtrar y eliminar centros de nuestro listado. 

<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/addfavorites.png" width="300">
<img src="https://github.com/CarlosMaldonado1998/SearchHealthWeb/blob/develop/Images/favorites%20-%20copia.png?raw=true" width="300">


**Sección de comentarios**

En el detalle de cada centro médico cuenta con un botón "Ver comentario" el cual nos va mostrar un listado de comentarios que ha recibido el centro médico dentro del cual podremos editar comentarios realizados o añadir nuevos comentarios.

<img src="https://github.com/CarlosMaldonado1998/SearchHealthWeb/blob/develop/Images/comments%20-%20copia.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/addComment.png" width="300">


**Sección de perfil**

El sección de perfil de usuario, se encuentra la información de la cuenta como nombre de usuario, correo electrónico y una imagen de perfil que puede ser actualizada. Adicionalmente se encuentra una guía de usuario que menciona las principales funcionalidades del aplicativo móvil. 


<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/perfil.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/editperfil.png" width="300">

<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/guia1.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/guia2.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/guia3.png" width="300">
<img src="https://raw.githubusercontent.com/CarlosMaldonado1998/SearchHealthWeb/develop/Images/guia4.png" width="300">




