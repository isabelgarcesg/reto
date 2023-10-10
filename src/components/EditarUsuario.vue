<template>
    <div class="container">

        <div class="card">
            <div class="card-header">
                <b>Creación de usuario</b>
            </div>
            <div class="card-body">
                <!--v-on:submit.prevent="edicionusuarios"-->
                <form v-on:submit.prevent="edicionusuarios">

                    <div class="form-group">
                        <label for="name">Nombre de la usuario</label>
                        <input type="text" class="form-control" name="name" v-model="usuario.name" id="name"
                            aria-describedby="helpId" placeholder="Nombre">
                        <small id="helpId" class="form-text text-muted">Ingrese el nombre de la usuario</small>
                    </div>

                    <div class="form-group">
                        <label for="phone">Teléfono</label>
                        <input type="text" class="form-control" name="phone" v-model="usuario.phone" id="phone"
                            aria-describedby="helpId" placeholder="Teléfono">
                        <small id="helpId" class="form-text text-muted">Ingrese el teléfono de la usuario</small>
                    </div>

                    <!-- <div class="form-group">
                      <label for="adress">Dirección</label>
                      <input type="text"
                        class="form-control" name="adress" v-model="usuario.adress" id="adress" aria-describedby="helpId" placeholder="Dirección">
                      <small id="helpId" class="form-text text-muted">Ingrese la dirección de la usuario</small>
                    </div> -->
                    <div class="form-group">
                        <label for="doc">Documento de identidad</label>
                        <input type="text" class="form-control" name="doc" v-model="usuario.doc" id="doc"
                            aria-describedby="helpId" placeholder="ID">
                        <small id="helpId" class="form-text text-muted">Ingrese el documento del usuario</small>
                    </div>

                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input type="password" class="form-control" name="password" v-model="usuario.password" id="password"
                            aria-describedby="helpId" placeholder="******">
                        <small id="helpId" class="form-text text-muted">Ingrese la contraseña</small>
                    </div>

                    <div class="form-group">
                        <label for="position">Cargo</label>
                        <input type="text" class="form-control" name="position" v-model="usuario.position" id="position"
                            aria-describedby="helpId" placeholder="Position">
                        <small id="helpId" class="form-text text-muted">Ingrese el position wtf?</small>
                    </div>

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
        this.edicionusuarios();
    },
    methods: {
        edicionusuarios() {
            let operation = "UpdateUser"
            let tna = 6
            let userId = this.$route.params.id
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            let nameUser = this.usuario.name
            let phoneUser = this.usuario.phone
            let positionUser = this.usuario.position
            let passwordUser = this.usuario.password
            let documentUser = this.usuario.doc
            let UserType = 3; // Declarar UserType fuera de los bloques if
            if (this.usuario.userType === "Administrador") {
                UserType = 1;
            } else if (this.usuario.userType === "Auditor") {
                UserType = 2;
            }
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation + '&tna=' + tna + '&nameUser=' + nameUser + '&phoneUser=' + phoneUser + '&positionUser=' + positionUser + '&userId=' + userId + +'&documentUser=' + documentUser + '&userType=' + UserType + '&passwordUser' + passwordUser + '&key=' + key)
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    //window.location.href='../Listarusuario'
                })
            //window.location.href='../Listarusuario'
        },
    }
}
</script>