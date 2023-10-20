<template>
    <div>
        <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="nav navbar-nav">
          <router-link :to="{ name: 'CrearEntidad' }" class="btn btn-info" style="margin-left: 30px;">Nuevo</router-link>
        </div>
      </nav>
  
      <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
      <div class="container mt-3">
        <div class="d-flex justify-content-center">
          <div class="card">
            <div class="card-header">
              Servicios existentes
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="servicio in Servicios" :key="servicio.id">
                    <td scope="row">
                      {{ servicio.name }}
                    </td>
                    <td>{{ servicio.description }}</td>
                    <td>
                      <router-link :to="{ name: 'ListarServicios', params: { id: servicio.id } }"                 
                        class="btn btn-outline-info">Editar</router-link>
                        <router-link :to="{ name: 'ListarEstandares', params: { id: servicio.id } }"
                        class="btn btn-outline-info">Estándares</router-link>
                      <button type="button" v-on:click="borrarServicio(servicio.id)" class="btn btn-outline-danger"
                        style="margin-left: 10px;">Borrar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        Servicios: [], //Crea un arreglo servicios que se va a ir llenando con lo que se retornó de la consulta del link en DatosRespuesta
      };
    },
    created: function () {
      this.consultarServicio();
    },
    methods: {
      //http://localhost/api/
  
      consultarServicio() {
        let userEntityId= this.$route.params.id
        fetch(
          "https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByEntity&entityIdService="+ userEntityId + "&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b"
        )
          .then((respuesta) => respuesta.json())
        //    .then((datosRespuesta)=>{
        //        console.log(datosRespuesta)
        //    })
          .then((datosRespuesta) => {
            //    console.log(datosRespuesta);
            //    console.log(datosRespuesta["arrayService"],'Hola')})
            this.Servicios = []; //Inicializa el arreglo para entidades
            if (
              datosRespuesta.arrayService &&
              datosRespuesta.arrayService.length === 0
            ) {
              // El array "arrayService" está vacío
              console.log("El array arrayService está vacío.");
            } else {
              this.Servicios = datosRespuesta["arrayService"]
  
              // El array "arrayService" no está vacío o no existe
              console.log(this.Servicios, "El array arrayService no está vacío o no existe.");
            }
          })
          .catch(console.log);
      },
      borrarServicio(id) {
        console.log(id)
        fetch("https://redb.qsystems.co/QS3100/QServlet?operation=DeleteService&tna=6&idService=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b")
          .then(respuesta => respuesta.json())
          .then((datosRespuesta) => {
            console.log(datosRespuesta)
            window.location.href = "../ListarServicios/" +this.$route.params.id
  
          })
          .catch(console.log)
      },
  
  
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .custom-link{
    text-decoration: underline;/* Añade un subrayado */
    color:black; /* Cambia el color del subrayado a negro */
  }
  .custom-link:hover {
  
    color:var(--primary); //Al pasar por encima se ve azul
  
    }
  </style>