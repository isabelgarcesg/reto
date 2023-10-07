<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Lista de todos los entidads en la base de datos
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
                            <td scope="row">{{entidad.name}}</td>
                            <td>{{entidad.phone}}</td>
                            <td>{{entidad.adress}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'editar', params:{id:entidad.id}}" class="btn btn-info">Editar</router-link>
                                    <button type="button" v-on:click="borrarentidad(entidad.id)" class="btn btn-danger">Borrar</button>
                                </div>
                            </td>
                        </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer text-muted">Copyright: Bioing Company 2023</div>
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
            this.Entidades=datosRespuesta["arrayEntity"]   

            // El array "arrayEntity" no está vacío o no existe
            console.log(this.Entidades,   "El array arrayEntity no está vacío o no existe.");
          }

          // if(typeof datosRespuesta["arrayEntity"]){ //si ese arreglo está vacio, entonces lo llena con los DatosRespuesta

          //     this.Entidades=datosRespuesta;
          // }
        })
        .catch(console.log);
    },
    borrarentidad(id){
        console.log(id)
        let operation="DeleteEntity"
        let tna=6
        let key="11e2e476-717b-4898-ac02-693abdecdc9b"
        //https://redb.qsystems.co/QS3100/QServlet?operation=DeleteEntity&tna=6&idEntity=29&key=11e2e476-717b-4898-ac02-693abdecdc9b
        fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&idEntity='+id+'&key='+key)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta)
            window.location.href="listar"

        })
        .catch(console.log)
    }
  },
};
</script>