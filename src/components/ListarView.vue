<template>
    <div class="container">
        
        <div class="card">
            <div class="card-header">
                Lista de todos los pacientes en la base de datos
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th>NOMBRE COMPLETO</th>
                            <th>TELÉFONO</th>
                            <th>DIRECCIÓN</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="paciente in pacientes" :key="paciente.id">
                            <td scope="row">{{paciente.nameEntity}}</td>
                            <td>{{paciente.phoneEntity}}</td>
                            <td>{{paciente.adressEntity}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'editar', params:{id:paciente.id}}" class="btn btn-info">Editar</router-link>
                                    <button type="button" v-on:click="borrarPaciente(paciente.id)" class="btn btn-danger">Borrar</button>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
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
        return {
            pacientes:[]
        }
    },
    created:function(){
        this.consultarEntidad();
    },
    methods:{
        //http://localhost/api/
        
        consultarEntidad(){
            // let operation="queryUserByTenancy"
            // let tna=6
            // let key="11e2e476-717b-4898-ac02-693abdecdc9b"
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByTenancy&tna:=6&key:=11e2e476-717b-4898-ac02-693abdecdc9b')
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                this.pacientes=[]
                if(typeof datosRespuesta[0].success==='undefined'){
                    this.pacientes=datosRespuesta;
                }

            })
            .catch(console.log)
        },
        borrarPaciente(id){
            console.log(id)
            //http://localhost/api/?borrar=
            fetch('http://localhost/api/?borrar='+id)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta)
                window.location.href="listar"

            })
            .catch(console.log)
        }

    }
}
</script>