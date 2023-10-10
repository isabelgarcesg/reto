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

              <div> <br> </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="position">Cargo</label>
                  <input type="text" class="form-control" name="position" v-model="usuario.position" id="position"
                    aria-describedby="helpId" placeholder="Cargo" required />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" class="form-control" name="password" v-model="usuario.password" id="password"
                    aria-describedby="helpId" required />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
            </div>

            <div><br /></div>
                    <!-- BOTONES -->
                   
                        <button type="submit" class="btn btn-primary">Editar</button>
                        <button type="reset" class="btn btn-danger" style="margin-left: 10px;">Cancelar</button>
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
        //    //this.obtenerInformacionID();
        this.edicionUsuarios();
    },
    methods: {

        obtenerInformacionID() {
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&userEntityId=82&key=11e2e476-717b-4898-ac02-693abdecdc9b' + this.$route.params.id)
                .then(respuesta => respuesta.json()) //es como un return y también hago una función arrow para volver la respuesta un json
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    this.paciente = datosRespuesta[0];

                })
                .catch(console.log) //es como try except

        },
        edicionUsuarios() {
            let operation = "UpdateUser"
            let tna = 6
            // let userId=this.usuario.id
            // let nameUser=this.usuario.name
            // let phoneUser=this.usuario.phone
            // let passwordUser=this.usuario.password
            // let documentUser=this.usuario.doc
            // let positionUser=this.usuario.position
            let UserType = 3; // Declarar UserType fuera de los bloques if
            if (this.usuario.userType === "Administrador") {
                UserType = 1;
            } else if (this.usuario.userType === "Auditor") {
                UserType = 2;
            }
            //let userEntityId=82
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            let datosEnviar = {
                userId: this.$route.params.id, nameUser: this.usuario.name,
                phoneUser: this.usuario.phone,
                passwordUser: this.usuario.password,
                documentUser: this.usuario.doc,
                positionUser: this.usuario.position,
                userEntityId: 82
            }
            console.log(this.$route.params.id)
            console.log(this.usuario.name)
            console.log(this.usuario.phone)
            console.log(JSON.stringify(datosEnviar));
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + 
            operation + 
            '&tna=' + tna+ 
            '&userId='+ datosEnviar.userId +
            '&nameUser='+datosEnviar.nameUser+
            '&phoneUser='+datosEnviar.phoneUser+
            '&passwordUser='+datosEnviar.passwordUser+
            '&documentUser='+datosEnviar.documentUser+
            '&positionUser='+datosEnviar.positionUser+
            '&userType='+UserType+
            '&userEntityId='+datosEnviar.userEntityId+
            '&key='+ key
            )
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    //window.location.href='../ListarUsuario'
                    // HOLA 
                })

        },
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
</style>
