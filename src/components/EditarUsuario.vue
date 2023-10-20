<template>
  <div class="container">
    <div class="card bg-white">
      <div class="card-header mt-3 mb-3">
        <b>Creación de usuario</b>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="mt-4 d-flex justify-content-center align-items-center">
          <form v-on:submit.prevent="edicionUsuarios">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Nombre completo</label>
                  <input type="text" class="form-control" name="name" v-model="usuario.name" id="name"
                    aria-describedby="helpId" placeholder="Nombre" required />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>


              <div class="col-md-6">
                <div class="form-group">
                  <label for="doc">Documento de identidad</label>
                  <input type="text" class="form-control" name="doc" v-model="usuario.doc" id="doc"
                    aria-describedby="helpId" placeholder="ID" required />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div> <br> </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">Celular</label>
                  <input type="text" class="form-control" name="phone" v-model="usuario.phone" id="phone"
                    aria-describedby="helpId" placeholder="Número de celular" required />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>



              <div class="col-md-6">
                <label for="userType" class="form-label">Tipo de usuario</label>
                <select class="form-select" id="userType" v-model="usuario.userType" required>
                  <option selected disabled value=""></option>
                  <option value="Administrador">Administrador</option>
                  <option value="Auditor">Auditor</option>
                  <option value="Normal">Normal</option>
                </select>
                <div class="invalid-feedback">
                  Please select a valid state.
                </div>
              </div>


              <!-- <div> <br> </div> -->
              <!-- <div class="col-md-6">
                <div class="form-group">
                  <label for="entityID">Entidad prestadora de servicios</label>
                  <input type="int" class="form-control" name="entityID" v-model="usuario.entityID" id="entityID"
                    aria-describedby="helpId" placeholder="Seleccione la entidad a la que pertenece" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div> -->


              <!--CARGO = POSITION-->
              <div class="flex">
                <div class="col-md-6 elemento">
                  <div class="form-group">
                    <label for="position">Cargo</label>
                    <input type="text" class="form-control" name="position" v-model="usuario.position" id="position"
                      aria-describedby="helpId" placeholder="Cargo" required />
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>

                <div class="col-md-6 elemento">
                  <div class="form-group">
                    <label for="nickname">Usuario</label>
                    <input type="text" class="form-control" name="nickname" v-model="usuario.nickname" id="nickname"
                      aria-describedby="helpId" placeholder="User" required />
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>
              

                <div class="col-md-6 elemento">
                  <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" name="password" v-model="usuario.password" id="password"
                      aria-describedby="helpId" placeholder="********" required />
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>
              </div>
            </div>



            <div><br /></div>

            <!-- BOTONES -->

            <button type="submit" class="btn btn-primary">Enviar</button>
            <button type="button" v-on:click="volver" class="btn btn-danger" style="margin-left: 10px">
              Cancelar
            </button>
          </form>
        </div>
      </div>

      <!-- <div class="card-footer text-muted">
        Copyright: LifeTech Solutions 2023
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            usuario: {}
        }
    },
    created: function () {
        //this.edicionusuarios();
        this.leerUsuarios();
    },
    methods: {
      leerUsuarios() {
      let operation="queryUserById"
          let tna=6
          let userId=this.$route.params.id
          let key="11e2e476-717b-4898-ac02-693abdecdc9b"
          fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+
          operation+
          '&tna='+
          tna+
          '&userId='+
          userId+
          '&key='
          +key)
          .then(respuesta=>respuesta.json())
          .then((datosRespuesta)=>{
            console.log(datosRespuesta['arrayUser'][0])
            this.usuario = datosRespuesta['arrayUser'][0];
          })
          .catch(console.log)

    },
    
        edicionUsuarios() {
          let operation = "UpdateUser"
            let tna = 6
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            let UserType = 3;
            if (this.usuario.userType === "Administrador") {
              UserType = 1;
            } else if (this.usuario.userType === "Auditor") {
              UserType = 2;
            }
            let datosEnviar = {
                userId: this.$route.params.id, 
                nameUser: this.usuario.name,
                phoneUser: this.usuario.phone,
                passwordUser: this.usuario.password,
                documentUser: this.usuario.doc,
                positionUser: this.usuario.position,
                userEntityId: this.$route.params.entity,
                nickname: this.usuario.nickname,
            }

            console.log(this.$route.params.id)
            console.log(this.usuario.name)
            console.log(JSON.stringify(datosEnviar));
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + 
            operation + 
            '&tna=' + tna+ 
            '&userId='+ datosEnviar.userId +
            '&nameUser='+datosEnviar.nameUser+
            '&nickname='+ datosEnviar.nickname+
            '&phoneUser='+datosEnviar.phoneUser+
            '&passwordUser='+datosEnviar.passwordUser+
            '&documentUser='+datosEnviar.documentUser+
            '&positionUser='+datosEnviar.positionUser+
            '&userType='+UserType+//datosEnviar.UserType+
            '&userEntityId='+datosEnviar.userEntityId+
            '&key='+ key
            )
                .then(respuesta => respuesta.json())
                .then((datosRespuesta=> {
                    console.log(datosRespuesta)
                    
                  window.location.href="/ListarUsuario/"+this.$route.params.entity
                    // HOLA 

                }))
            //window.location.href='../Listarusuario'
        }
    }
}
</script>

<style lang="scss" scoped>
input{
    border-radius:10px;
}

select{
    border-radius:10px;
}

.flex {
  display: flex;
  flex-direction: row; /* Establece la dirección de flexión a filas */
}
.elemento {
  flex: 1; 
  flex-basis: 0; 
  padding: 10px; 
  margin: 5px; 
}
</style>
