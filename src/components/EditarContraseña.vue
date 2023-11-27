<template>
   <div class="container">
      <div class="card">
         <div class="card-body">
            <h4 class="card-title mb-4 text-center"><strong>Editar Entidad</strong></h4>
            <div class="mt-4 d-flex justify-content-center align-items-center">

               <form v-on:submit.prevent="changePassword">

                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group">
                           <label for="passwordUser">Contraseña actual:</label>
                           <input type="password" class="form-control" name="passwordUser" v-model="usuario.passwordUser"
                              id="passwordUser" aria-describedby="helpId" placeholder="Contraseña actual" required />
                           <small id="helpId" class="form-text text-muted"></small>
                        </div>
                     </div>
                     <div> <br> </div>
                     <div class="col-md-6">
                        <div class="form-group">
                           <label for="passwordNew">Nueva contraseña:</label>
                           <input type="password" class="form-control" name="passwordNew" v-model="usuario.passwordNew"
                              id="passwordNew" aria-describedby="helpId" placeholder="Nueva contraseña" required />
                           <small id="helpId" class="form-text text-muted"></small>
                        </div>
                     </div>
                  </div>

                  <div v-if="error" class="alert alert-danger">
                     {{ error }}
                  </div>
                  <div><br></div>
                  <div class="d-flex justify-content-between"> 
                  <button type="submit" class="btn btn-info">Cambiar contraseña</button>
                  <button type="button" class="btn btn btn-danger" @click="cancelEdit">Cancelar</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>
   
<script>
export default {
   data() {
      return {
         usuario: {},
         error: null  // Variable para controlar el mensaje de error
      };
   },
   methods: {
      changePassword() {
         let operation = "UpdatePassword";
         let tna = 6;
         let key = "11e2e476-717b-4898-ac02-693abdecdc9b";
         let userId = this.$route.params.id;
         let passwordUser = this.usuario.passwordUser;
         let passwordNew = this.usuario.passwordNew;

         fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
            operation +
            '&tna=' + tna +
            '&userId=' + userId +
            '&passwordNew=' + passwordNew +
            '&passwordUser=' + passwordUser +
            '&key=' + key)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
               console.log(datosRespuesta);
               if (datosRespuesta["message"] === "Contraseña editada exitosamente") {
                  console.log("Login válido");
                  console.log(datosRespuesta["userVO"]); // Asegúrate de que esto contenga la información del usuario
                  this.usuario = datosRespuesta["userVO"];
                  localStorage.setItem("user", JSON.stringify(this.usuario));
                  window.location.href = "/ListarUsuario/" + this.$route.params.entidad

               } else {
                  console.log("La información suministrada no coincide con la del usuario");
                  console.log(datosRespuesta["error"]);
                  this.error = datosRespuesta["error"]; // Establece el mensaje de error
               }
            })
            .catch(console.log);
      },

      cancelEdit() {
         window.location.href = "/ListarUsuario/" + this.$route.params.entidad
      }

   },
};
</script>