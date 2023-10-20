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
            Entidades existentes
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entidad in Entidades" :key="entidad.id">
                  <td scope="row">
                    <router-link :to="{ name: 'ListarUsuario', params: { id: entidad.id } }" class="custom-link">{{
                      entidad.name }}</router-link>
                  </td>
                  <td>{{ entidad.phone }}</td>
                  <td>{{ entidad.adress }}</td>
                  <td class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      Opciones
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><router-link :to="{ name: 'EditarEntidad', params: { id: entidad.id } }"
                          class="dropdown-item">Editar Entidad</router-link></li>
                      <li><button type="button" v-on:click="borrarentidad(entidad.id)"
                          class="dropdown-item">Borrar Entidad</button></li>
                      <li><router-link :to="{ name: 'ListarUsuario', params: { id: entidad.id } }"
                          class="dropdown-item">Ver usuarios</router-link></li>
                      <li><router-link :to="{ name: 'ListarServicios', params: { id: entidad.id }} "
                        class="dropdown-item">Servicios</router-link></li>
                    </ul>
                    <!-- <router-link :to="{ name: 'EditarEntidad', params: { id: entidad.id } }"
                      class="btn btn-outline-info">Editar</router-link>
                    <button type="button" v-on:click="borrarentidad(entidad.id)" class="btn btn-outline-danger"
                      style="margin-left: 10px;">Borrar</button> -->
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
      Entidades: [], //Crea un arreglo entidades que se va a ir llenando con lo que se retornó de la consulta dle link en DatosRespuesta
    };
  },
  created: function () {
    this.consultarEntidad();
  },
  methods: {
    //http://localhost/api/

    consultarEntidad() {
      // let operation="queryUserByTenancy"
      // let tna=6
      // let key="11e2e476-717b-4898-ac02-693abdecdc9b"
      //  https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b CONSULTAR USUARIOS BY TENANCY

      fetch(
        "https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b"
      )
        .then((respuesta) => respuesta.json())
        // .then((datosRespuesta)=>{
        //     console.log(datosRespuesta)
        // })
        .then((datosRespuesta) => {
          //   console.log(datosRespuesta["arrayEntity"][0].name, "hola1");
          this.Entidades = []; //Inicializa el arreglo para entidades
          if (
            datosRespuesta.arrayEntity &&
            datosRespuesta.arrayEntity.length === 0
          ) {
            // El array "arrayEntity" está vacío
            console.log("El array arrayEntity está vacío.");
          } else {
            this.Entidades = datosRespuesta["arrayEntity"]

            // El array "arrayEntity" no está vacío o no existe
            console.log(this.Entidades, "El array arrayEntity no está vacío o no existe.");
          }
        })
        .catch(console.log);
    },
    borrarentidad(id) {
      console.log(id)
      let operation = "DeleteEntity"
      let tna = 6
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      //https://redb.qsystems.co/QS3100/QServlet?operation=DeleteEntity&tna=6&idEntity=29&key=11e2e476-717b-4898-ac02-693abdecdc9b
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation + '&tna=' + tna + '&idEntity=' + id + '&key=' + key)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta)
          window.location.href = "ListarEntidad"

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
</style>