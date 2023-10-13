<template>
    <div class="container">
        
        <div class="card">
            <div class="card-header">
                <b>Creación de entidad</b>
            </div>
            <div class="card-body">
              <!--v-on:submit.prevent="edicionEntidades"-->
                <form v-on:submit.prevent="edicionEntidades">

                    <div class="form-group">
                      <label for="name">Nombre de la entidad</label>
                      <input type="text"
                        class="form-control" name="name" v-model="entidad.name"  id="name" aria-describedby="helpId" placeholder="Nombre" required>
                      <small id="helpId" class="form-text text-muted">Ingrese el nombre de la entidad</small>
                    </div>

                    <div class="form-group">
                      <label for="phone">Teléfono</label>
                      <input type="text"
                        class="form-control" name="phone"  v-model="entidad.phone" id="phone" aria-describedby="helpId" placeholder="Teléfono" required>
                      <small id="helpId" class="form-text text-muted">Ingrese el teléfono de la entidad</small>
                    </div>

                    <div class="form-group">
                      <label for="adress">Dirección</label>
                      <input type="text"
                        class="form-control" name="adress" v-model="entidad.adress" id="adress" aria-describedby="helpId" placeholder="Dirección" required>
                      <small id="helpId" class="form-text text-muted">Ingrese la dirección de la entidad</small>
                    </div>
                    

                        <button type="submit" class="btn btn-primary">Modificar</button>
                        <button type="reset" class="btn btn-danger" style="margin-left: 10px;">Cancelar</button>



                </form>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            entidad:{}
        }
    },
    created:function(){
        this.edicionEntidades();
    },  
    methods:{
        edicionEntidades(){
            let operation="UpdateEntity"
            let tna=6
            let idEntity=this.$route.params.id
            let key="11e2e476-717b-4898-ac02-693abdecdc9b"
            let nameEntity=this.entidad.name
            let phoneEntity=this.entidad.phone
            let adressEntity=this.entidad.adress
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&nameEntity='+nameEntity+'&phoneEntity='+phoneEntity+'&adressEntity='+adressEntity+'&idEntity='+idEntity+'&key='+key)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta)
                
              window.location.href='../ListarEntidad'
            }))
            //window.location.href='../ListarEntidad'
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