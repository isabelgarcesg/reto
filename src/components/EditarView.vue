<template>

    <div class="container">
        
        <div class="card">
            <div class="card-header">
                <b>Página para editar un paciente</b>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="actualizarRegistro">
                    <div class="form-group">
                      <label for="doc">Documento de identidad</label>
                      <input type="text"
                        class="form-control" name="doc" v-model="paciente.doc" id="doc" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Ingrese el documento del paciente</small>
                    </div>
                    <div class="form-group">
                      <label for="name">Nombre</label>
                      <input type="text"
                        class="form-control" name="name" v-model="paciente.name"  id="name" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Ingrese el nombre del paciente</small>
                    </div>
                    <div class="form-group">
                      <label for="lastname">Apellidos</label>
                      <input type="text"
                        class="form-control" name="lastname"  v-model="paciente.lastname" id="lastname" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Ingrese los apellidos del paciente</small>
                    </div>
                    <div class="btn-group" role="group" aria-label="">
                        <button type="submit" class="btn btn-success">Modificar</button>
                        <button type="reset" class="btn btn-warning">Cancelar</button>
                    </div>


                </form>
            </div>
            <div class="card-footer text-muted">
                Copyright: Bioing Company 2023
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            paciente:{}
        }
    },
    created:function(){
        this.obtenerInformacionID();
    },
    methods:{
        obtenerInformacionID(){
            fetch('http://localhost/api/?consultar='+this.$route.params.id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                this.paciente=datosRespuesta[0];

            })
            .catch(console.log)
        },
        actualizarRegistro(){
            let datosEnviar={id:this.$route.params.id , doc:this.paciente.doc , name:this.paciente.name , lastname:this.paciente.lastname}
            fetch('http://localhost/api/?actualizar='+this.$route.params.id ,{
                method:"POST",
                body:JSON.stringify(datosEnviar)
            })
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta);
                window.location.href='../listar' //Redirecciona a la ruta listar
            })) 
        }
    }

}
</script>