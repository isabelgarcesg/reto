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
          <form v-on:submit.prevent="agregarUsuario">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nombre completo</label>
                  <input type="text" class="form-control" name="name" v-model="usuario.name" id="name"
                    aria-describedby="helpId" placeholder="Nombre" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div><br /></div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="doc">Documento de identidad</label>
                  <input type="text" class="form-control" name="doc" v-model="usuario.doc" id="doc"
                    aria-describedby="helpId" placeholder="ID" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">Celular</label>
                  <input type="text" class="form-control" name="phone" v-model="usuario.phone" id="phone"
                    aria-describedby="helpId" placeholder="Número de celular" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div><br /></div>


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


              <div class="col-md-6">
                <div class="form-group">
                  <label for="entityID">Entidad prestadora de servicios</label>
                  <input type="int" class="form-control" name="entityID" v-model="usuario.entityID" id="entityID"
                    aria-describedby="helpId" placeholder="Seleccione la entidad a la que pertenece" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div><br /></div>

              <!--CARGO = POSITION-->
              <div class="col-md-6">
                <div class="form-group">
                  <label for="position">Cargo</label>
                  <input type="text" class="form-control" name="position" v-model="usuario.position" id="position"
                    aria-describedby="helpId" placeholder="Cargo" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" class="form-control" name="password" v-model="usuario.password" id="password"
                    aria-describedby="helpId" />
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
            </div>

            <div><br /></div>

            <!-- BOTONES -->

            <button type="submit" class="btn btn-primary">Enviar</button>
            <button type="reset" class="btn btn-danger" style="margin-left: 10px">
              Borrar
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
      usuario: {},
    };
  },
  methods: {
    // SI QUIERE VERIFICAR QUE SE CREO EL USUARIO PONGA EL SIGUIENTE LINK EN EL NAVEGADOR:
    // https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b&userEntityId=29

    agregarUsuario() {
      console.log(this.usuario);
      // let datosEnviar={id:null , doc:this.usuario.doc , name:this.usuario.name , lastname:this.usuario.lastname}
      let operation = "SaveUser";
      let tna = 6;
      let nameUser = this.usuario.name;
      let phoneUser = this.usuario.phone;
      let passwordUser = this.usuario.password;
      let documentUser = this.usuario.doc;
      let positionUser = this.usuario.position;
      let UserType = 3; // Declarar UserType fuera de los bloques if
      if (this.usuario.userType === "Administrador") {
        UserType = 1;
      } else if (this.usuario.userType === "Auditor") {
        UserType = 2;
      }
      let userEntityId = this.usuario.entityID;
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b";
      fetch(
        "https://redb.qsystems.co/QS3100/QServlet?operation=" +
        operation +
        "&tna=" +
        tna +
        "&nameUser=" +
        nameUser +
        "&phoneUser=" +
        phoneUser +
        "&passwordUser=" +
        passwordUser +
        "&documentUser=" +
        documentUser +
        "&positionUser=" +
        positionUser +
        "&userType=" +
        UserType +
        "&userEntityId=" +
        userEntityId +
        "&key=" +
        key
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  .card {
    background-color: var(--light-blue);
  }
}
</style>