<template>
  <div class="page-container">

    <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
    <div class="container">

      <div class="card">

        <div class="card-body">
          <h4 class="card-title mb-4 text-center" v-if="(user.userType !== 1)" aria-disabled=""><strong>Lista de Servicios</strong></h4>
          <h4 v-if="(user.userType !== 2) && (user.userType !== 3)"
      aria-disabled="" class="card-title mb-4 text-center"><strong>Lista de Servicios<router-link :to="{ name: 'CrearServicio', params: { entityId: $route.params.id } }"
          style="margin-left: 50px;"><span class="material-icons text-muted"
            style="font-size: 24px;">add_box</span></router-link></strong></h4>

          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>

                <!-- ADMIN NO PUEDE VER -->
                <th v-if="user.userType === 2 || user.userType === 3">Ver Estándar</th>

                <!-- ADMIN  PUEDE VER -->
                <th v-if="(user.userType !== 2) && (user.userType !== 3)">Acciones</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="servicio in Servicios" :key="servicio.id">
                <td scope="row">
                  {{ servicio.name }}
                </td>
                <td>{{ servicio.description }}</td>
                <!-- Normal y auditor NO pueden ver, ADMIN SI-->
                <td v-if="(user.userType !== 2) && (user.userType !== 3)" aria-disabled="" class="dropdown">

                  <span class="material-icons" data-bs-toggle="dropdown">
                    expand_more
                  </span>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">


                    <li><router-link :to="{ name: 'ListarEstandares', params: { id: servicio.id } }"
                        class="dropdown-item">Ver estándares</router-link></li>

                    <li><router-link
                        :to="{ name: 'EditarServicio', params: { idServ: servicio.id, entity: $route.params.id } }"
                        class="dropdown-item">Editar</router-link></li>

                    <li>
                      <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        v-on:click="servicioSeleccionado = servicio">
                        Borrar
                      </button>
                    </li>
                  </ul>
                </td>
                <!-- NORMAL Y AUDITOR PUEDEN VER, ese class dropdown permitío alinearlo, incluso si no es dropdown-->
                <td v-if="user.userType === 2 || user.userType === 3" class="dropdown">

                  <router-link :to="{ name: 'ListarEstandares', params: { id: servicio.id } }" class="botton"><span
                      class="material-icons text-muted">feed</span></router-link>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Borrar Servicio</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Esta acción eliminará el servicio permanentemente
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" v-on:click="borrarServicio(servicioSeleccionado.id)"
            class="btn btn-primary">Entendido</button>
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
  computed: {
    user() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(typeof (user.userType));
      return user
    }
  },
  methods: {
    //http://localhost/api/

    consultarServicio() {
      let userEntityId = this.$route.params.id //id entidad
      fetch(
        "https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByEntity&entityIdService=" + userEntityId + "&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b"
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
          window.location.href = "../ListarServicios/" + this.$route.params.id

        })
        .catch(console.log)
    },


  },
};
</script>
 
<style lang="scss" scoped>
.dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-link {
  text-decoration: underline;
  /* Añade un subrayado */
  color: black;
  /* Cambia el color del subrayado a negro */
}

.custom-link:hover {

  color: var(--primary); //Al pasar por encima se ve azul

}

.dropdown:hover .material-icons {
  /* Cambia el color de fondo en hover */
  cursor: pointer;
}
div {

.card {
    background-color: #fdfdfd;
    display: flex;
    // margin-right: 10rem;
    margin-left: 15rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: 70%; 
}
}
.container {
  display: flex;
  justify-content: center;
}
.page-container {
  display: flex;
  justify-content: center;
  width: 80%; 
  // align- items: center;
  // min-height: 100vh; /* Asegura que el contenedor ocupe al menos el 100% de la altura de la ventana */
}
.table {
  flex-grow: 1; /* La tabla ocupará el espacio disponible en el contenedor */
  overflow-y: auto; /* Agrega un desplazamiento vertical si la tabla es más grande que el contenedor */
}
</style>