<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="nav navbar-nav">
        <!--  ServiceId: $route.params.id -->
        <router-link :to="{ name: 'CrearEstandar', params: {ServiceId:$route.params.id } }" style="margin-left: 600px;"><span class="material-icons text-muted"
            style="font-size: 24px;">add_box</span></router-link>
      </div>
    </nav>

    <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
    <div class="container">

      <div class="card">
        <div class="card-body">
          <h4 class="card-title mb-4 text-center"><strong>Lista de estándares</strong></h4>

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
                <td class="dropdown">
                  <!-- <router-link :to="{ name: 'EditarEstandar', params: { idEst: estandar.id, idServ:$route.params.id} }"                
                    class="btn btn-outline-info">Editar</router-link>
                    <button type="button" v-on:click="borrarEstandar(estandar.id)" class="btn btn-outline-danger"
                    style="margin-left: 10px;">Borrar</button> -->
                  <span class="material-icons" data-bs-toggle="dropdown">
                    expand_more
                  </span>
                  <!-- </button> -->
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                    <!-- ACA VAN A IR LOS CRITERIOS -->
                    <li>criterios</li>

                    <li><router-link
                        :to="{ name: 'EditarEstandar', params: { idEst: estandar.id, idServ: $route.params.id } }"
                        class="dropdown-item">Editar</router-link></li>

                    <li><button type="button" class="dropdown-item" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop" v-on:click="estandarSeleccionado = estandar">
                        Borrar
                      </button></li>
                  </ul>



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
          <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Esta acción eliminará la entidad permanentemente
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" v-on:click="borrarEstandar(estandarSeleccionado.id)"
            class="btn btn-primary">Borrar</button>
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
      let userServiceId = this.$route.params.id
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
          window.location.href = "../ListarEstandares/" + this.$route.params.id

        })
        .catch(console.log)
    },


  },
};
</script>

<style lang="scss" scoped>
.custom-link {
  text-decoration: underline;
  /* Añade un subrayado */
  color: black;
  /* Cambia el color del subrayado a negro */
}

.custom-link:hover {

  color: var(--primary); //Al pasar por encima se ve azul

}

.dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dropdown:hover .material-icons {
  /* Cambia el color de fondo en hover */
  cursor: pointer;
}</style>