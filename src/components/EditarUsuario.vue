<template>
    <div class="container">

        <div class="card">
            <div class="card-header">
                <b>Edicion de usuario</b>
            </div>
            <div class="card-body">
                <!--v-on:submit.prevent="edicionUsuarios"-->
                <form v-on:submit.prevent="edicionUsuarios">


                    <div class="form-group">
                        <label for="doc">Documento de identidad</label>
                        <input type="text" class="form-control" name="doc" v-model="usuario.doc" id="doc"
                            aria-describedby="helpId" placeholder="ID">
                        <small id="helpId" class="form-text text-muted">Ingrese el documento del usuario</small>
                    </div>


                    <div class="form-group">
                        <label for="name">Nombre completo</label>
                        <input type="text" class="form-control" name="name" v-model="usuario.name" id="name"
                            aria-describedby="helpId" placeholder="Nombre">
                        <small id="helpId" class="form-text text-muted">Ingrese el nombre del usuario</small>
                    </div>


                    <div class="form-group">
                        <label for="phone">Celular</label>
                        <input type="text" class="form-control" name="phone" v-model="usuario.phone" id="phone"
                            aria-describedby="helpId" placeholder="Número de celular">
                        <small id="helpId" class="form-text text-muted">Ingrese el celular del usuario</small>
                    </div>


                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" name="password" v-model="usuario.password" id="password"
                            aria-describedby="helpId" placeholder="******">
                        <small id="helpId" class="form-text text-muted">Ingrese la contraseña</small>
                    </div>


                    <div class="form-group">
                        <label for="position">Position</label>
                        <input type="text" class="form-control" name="position" v-model="usuario.position" id="position"
                            aria-describedby="helpId" placeholder="Position">
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
                        <select class="form-control" name="userType" v-model="usuario.userType" id="userType"
                            aria-describedby="helpId">
                            <option value="Administrador">Administrador</option>
                            <option value="Auditor">Auditor</option>
                            <option value="Normal">Normal</option>
                        </select>
                        <small id="helpId" class="form-text text-muted">Seleccione el perfil del usuario</small>
                    </div>

                    <!-- Puede que este se elimine y se deje como un ID de la entidas fijo si solo tenemos que hacer un hospital, depende. -->
                    <!-- <div class="form-group">
                        <label for="entityID">ID del prestador de servicios</label>
                        <input type="int" class="form-control" name="entityID" v-model="usuario.entityID" id="entityID"
                            aria-describedby="helpId" placeholder="">
                        <small id="helpId" class="form-text text-muted">Ingrese el ID de la entidad/hospital</small>
                    </div> -->

                    <!-- BOTONES -->
                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Modificar</button>
                        <button type="reset" class="btn btn-warning">Cancelar</button>
                    </div>


                </form>
            </div>


            <div class="card-footer text-muted">
                Copyright: LifeTech Solutions 2023
            </div>


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
        obtenerInformacionID(){
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&userEntityId=82&key=11e2e476-717b-4898-ac02-693abdecdc9b'+ this.$route.params.id)
            .then(respuesta=>respuesta.json()) //es como un return y también hago una función arrow para volver la respuesta un json
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                this.paciente=datosRespuesta[0];
                
            })
            .catch(console.log) //es como try except
        
        },
        edicionUsuarios() {
            let operation = "UpdateUser"
            let tna = 6
            let userId = this.$route.params.id
            let nameUser = this.usuario.name
            let phoneUser = this.usuario.phone
            let passwordUser = this.usuario.password
            let documentUser = this.usuario.doc
            let positionUser = this.usuario.position
            let UserType = 3; // Declarar UserType fuera de los bloques if
            if (this.usuario.userType === "Administrador") {
                UserType = 1;
            } else if (this.usuario.userType === "Auditor") {
                UserType = 2;
            }
            //let userEntityId = this.usuario.entityID
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation + '&tna=' + tna + '&userId=' + userId + '&nameUser=' + nameUser + '&phoneUser=' + phoneUser + '&passwordUser=' + passwordUser + '&documentUser=' + documentUser + '&positionUser=' + positionUser + '&userType= int' + UserType + '&userEntityId=' + 82 + '&key=' + key)
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    //window.location.href='../ListarUsuario'
                })


        },
    }


}
</script>
