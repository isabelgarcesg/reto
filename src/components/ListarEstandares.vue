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
              Estándares existentes
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
                  <tr v-for="estandar in Estandares" :key="estandar.id">
                    <td scope="row">
                      {{ estandar.name }}
                    </td>
                    <td>{{ estandar.description }}</td>
                    <td>
                      <router-link :to="{ name: 'ListarServicios', params: { id: estandar.id } }"                 
                        class="btn btn-outline-info">Editar</router-link>
                      <button type="button" v-on:click="borrarEstandar(estandar.id)" class="btn btn-outline-danger"
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
        Estandares: [], //Crea un arreglo servicios que se va a ir llenando con lo que se retornó de la consulta del link en DatosRespuesta
      };
    },
    created: function () {
      this.consultarEstandar();
    },
    methods: {
      //http://localhost/api/
  
      consultarEstandar() {
        let userServiceId= this.$route.params.id
        fetch(
          "https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardByService&tna=6&serviceIdStandard=" + userServiceId + "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
        )
          .then((respuesta) => respuesta.json())
            // .then((datosRespuesta)=>{
            //     console.log(datosRespuesta)
            // })
          .then((datosRespuesta) => {
                // console.log(datosRespuesta);
                // console.log(datosRespuesta["arrayStandard"],'Hola')})
            this.Estandares = []; //Inicializa el arreglo para entidades
            if (
              datosRespuesta.arrayStandard &&
              datosRespuesta.arrayStandard.length === 0
            ) {
              // El array "arrayStandard" está vacío
              console.log("El array arrayStandard está vacío.");
            } else {
              this.Estandares = datosRespuesta["arrayStandard"]
  
              // El array "arrayStandard" no está vacío o no existe
              console.log(this.Estandares, "El array arrayStandard no está vacío o no existe.");
            }
          })
          .catch(console.log);
      },
      borrarEstandar(id) {
        console.log(id)
        fetch("https://redb.qsystems.co/QS3100/QServlet?operation=DeleteStandard&tna=6&idStandard=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b")
          .then(respuesta => respuesta.json())
          .then((datosRespuesta) => {
            console.log(datosRespuesta)
            window.location.href = "../ListarEstandares/" +this.$route.params.id
  
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