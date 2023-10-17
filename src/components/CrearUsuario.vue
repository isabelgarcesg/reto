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

                    <div class="form-group">
                      <label for="position">Position</label>
                      <input type="text"
                        class="form-control" name="position"  v-model="usuario.position" id="position" aria-describedby="helpId" placeholder="Position">
                      <small id="helpId" class="form-text text-muted">Ingrese el position wtf?</small>
                    </div>   

                    <!-- <div class="form-group">
                      <label for="userType">Tipo de usuario</label>
                      <input type="int"
                        class="form-control" name="userType"  v-model="usuario.userType" id="userType" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Ingrese el perfil del usuario</small>
                    </div>   -->

                    <div class="form-group">
                      <label for="userType">Tipo de usuario</label>
                      <select class="form-control" name="userType" v-model="usuario.userType" id="userType" aria-describedby="helpId">
                        <option value="Administrador">Administrador</option>
                        <option value="Auditor">Auditor</option>
                        <option value="Normal">Normal</option>
                      </select>
                      <small id="helpId" class="form-text text-muted">Seleccione el perfil del usuario</small>
                    </div>
                    
                    <!-- Puede que este se elimine y se deje como un ID de la entidas fijo si solo tenemos que hacer un hospital, depende. -->
                    <div class="form-group">
                      <label for="entityID">ID del prestador de servicios</label>
                      <input type="int"
                        class="form-control" name="entityID"  v-model="usuario.entityID" id="entityID" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Ingrese el ID de la entidad/hospital</small>
                    </div>  
                    
                    <!-- BOTONES -->
                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button type="reset" class="btn btn-warning">Borrar</button>
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
    data(){
        return{
            usuario:{}
        }
    },
    methods:{
        // SI QUIERE VERIFICAR QUE SE CREO EL USUARIO PONGA EL SIGUIENTE LINK EN EL NAVEGADOR:
        // https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b&userEntityId=29
        
        agregarUsuario(){
            console.log(this.usuario)
            // let datosEnviar={id:null , doc:this.usuario.doc , name:this.usuario.name , lastname:this.usuario.lastname}
            let operation="SaveUser"
            let tna=6
            let nameUser=this.usuario.name
            let phoneUser=this.usuario.phone
            let passwordUser=this.usuario.password
            let documentUser=this.usuario.doc
            let positionUser=this.usuario.position
            let UserType = 3; // Declarar UserType fuera de los bloques if
            if (this.usuario.userType === "Administrador") {
              UserType = 1;
            } else if (this.usuario.userType === "Auditor") {
              UserType = 2;
            }
            let userEntityId=this.usuario.entityID
            let key="11e2e476-717b-4898-ac02-693abdecdc9b"
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&nameUser='+nameUser+'&phoneUser='+phoneUser+'&passwordUser='+passwordUser+'&documentUser='+documentUser+'&positionUser='+positionUser+'&userType='+UserType+'&userEntityId='+userEntityId+'&key='+key)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta);
            }))
        }
    }
}
</script>