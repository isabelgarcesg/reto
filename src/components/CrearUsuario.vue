<template>
    <div class="container">
        
        <div class="card">
            <div class="card-header">
                <b>Creación de usuario</b>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="agregarUsuario">
                    <div class="form-group">
                      <label for="doc">Documento de identidad</label>
                      <input type="text"
                        class="form-control" name="doc" v-model="usuario.doc" id="doc" aria-describedby="helpId" placeholder="ID">
                      <small id="helpId" class="form-text text-muted">Ingrese el documento del usuario</small>
                    </div>
                    <div class="form-group">
                      <label for="name">Nombre completo</label>
                      <input type="text"
                        class="form-control" name="name" v-model="usuario.name"  id="name" aria-describedby="helpId" placeholder="Nombre">
                      <small id="helpId" class="form-text text-muted">Ingrese el nombre del usuario</small>
                    </div>
                    <div class="form-group">
                      <label for="phone">Celular</label>
                      <input type="text"
                        class="form-control" name="phone"  v-model="usuario.phone" id="phone" aria-describedby="helpId" placeholder="Número de celular">
                      <small id="helpId" class="form-text text-muted">Ingrese el celular del usuario</small>
                    </div>
                    <div class="form-group">
                      <label for="password">Contraseña</label>
                      <input type="password"
                        class="form-control" name="password"  v-model="usuario.password" id="password" aria-describedby="helpId" placeholder="******">
                      <small id="helpId" class="form-text text-muted">Ingrese la contraseña</small>
                    </div>          
                    <div class="form-group">
                      <label for="position">Contraseña</label>
                      <input type="position"
                        class="form-control" name="position"  v-model="usuario.position" id="position" aria-describedby="helpId" placeholder="Position">
                      <small id="helpId" class="form-text text-muted">Ingrese el position wtf?</small>
                    </div>   
                    
                    
                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Enviar</button>
                        <button type="reset" class="btn btn-warning">Borrar</button>
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
    data(){
        return{
            usuario:{}
        }
    },
    methods:{
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
            let userType=null
            let userEntity=null
            let key="11e2e476-717b-4898-ac02-693abdecdc9b"
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&nameUser='+nameUser+'&phoneUser='+phoneUser+'&passwordUser='+passwordUser+'&documentUser='+documentUser+'&positionUser='+positionUser+'&userType='+userType+'&userEntity='+userEntity+'&key='+key)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta);
            }))
        }
    }
}
</script>