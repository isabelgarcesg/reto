<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="nav navbar-nav">
        <router-link :to="{ name: 'crear' }" class="btn btn-info" style="margin-left: 30px;">Nuevo</router-link>
        <router-link :to="{ name: 'ListarUsTenan' }" class="btn btn-info" style="margin-left: 30px;">Tenancy</router-link>
      </div>
    </nav>
  
  <div class="container">
    <div class="card">
      <div class="card-header">
        Usuarios del Hospital Constantino
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Cargo</th>
              <th>Tipo</th>
              <th>Entidad</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td scope="row">{{ usuario.name }}</td>
              <td>{{ usuario.document }}</td>
              <td>{{ usuario.phone }}</td>
              <td>{{ usuario.position }}</td>
              <td>{{ usuario.userType }}</td>
              <td>Hospital Constantino</td>
              <td>
                
                  <router-link :to="{ name: 'EditarUsuario', params: { id: usuario.id } }" class="btn btn-outline-info">Editar</router-link>
                  <button type="button" v-on:click="borrarusuario(usuario.id)" class="btn btn-outline-danger" style="margin-left: 10px;">Borrar</button>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="card-footer text-muted">Copyright: Bioing Company 2023</div> -->
    </div>
  </div>
</div>
</template>
  
<script>
export default {
  data() {
    return {
      usuarios: [], //Crea un arreglo usuarios que se va a ir llenando con lo que se retornó de la consulta dle link en DatosRespuesta
    };
  },
  created: function () {
    this.consultarusuario();
  },
  methods: {
    consultarusuario() {
      fetch("https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&userEntityId=82&key=11e2e476-717b-4898-ac02-693abdecdc9b")
        .then((respuesta) => respuesta.json())
        // .then((datosRespuesta) => {
        //   console.log(datosRespuesta)
        //   console.log(datosRespuesta["arrayUser"][0].name, "holiwis")
        // })
        .then((datosRespuesta) => {
          this.usuarios = []; //Inicializa el arreglo para usuarios
          if (datosRespuesta.arrayUser && datosRespuesta.arrayUser.length === 0) {
            console.log("El array arrayEntity está vacío.");
          } 
          else {this.usuarios = datosRespuesta["arrayUser"]
            console.log(this.usuarios, "El array USER NO está vacío ");
          }
        })
        .catch(console.log)
    },

  borrarusuario(id){
      console.log(id)
      let operation="DeleteUser"
      let tna=6
      let key="11e2e476-717b-4898-ac02-693abdecdc9b"
      //https://redb.qsystems.co/QS3100/QServlet?operation=DeleteUser&tna=6&userId=CAMBIO&key=11e2e476-717b-4898-ac02-693abdecdc9b
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&userId='+id+'&key='+key)
      .then(respuesta=>respuesta.json())
      .then((datosRespuesta)=>{
          console.log(datosRespuesta)
          window.location.href="ListarUsuario"

      })
      .catch(console.log)
  }
},
  };
</script>