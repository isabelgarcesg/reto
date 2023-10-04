<template>
    <div class="container">
        
        <div class="card">
            <div class="card-header">
                <b>Creación de entidad</b>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="createEntity">

                    <div class="form-group">
                      <label for="name">Nombre de la entidad</label>
                      <input type="text"
                        class="form-control" name="name" v-model="entidad.name"  id="name" aria-describedby="helpId" placeholder="Nombre">
                      <small id="helpId" class="form-text text-muted">Ingrese el nombre de la entidad</small>
                    </div>

                    <div class="form-group">
                      <label for="phone">Teléfono</label>
                      <input type="text"
                        class="form-control" name="phone"  v-model="entidad.phone" id="phone" aria-describedby="helpId" placeholder="Teléfono">
                      <small id="helpId" class="form-text text-muted">Ingrese el teléfono de la entidad</small>
                    </div>

                    <div class="form-group">
                      <label for="adress">Dirección</label>
                      <input type="text"
                        class="form-control" name="adress" v-model="entidad.adress" id="adress" aria-describedby="helpId" placeholder="Dirección">
                      <small id="helpId" class="form-text text-muted">Ingrese la dirección de la entidad</small>
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
        created:function(){
            this.createEntity();
        },
        data(){
            return{
                entidad:{}
            }
        },
        methods: {   
            // SI QUIERE VERIFICAR QUE SE CREO LA ENTIDAD PONGA EL SIGUIENTE LINK EN EL NAVEGADOR:
            // https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
            createEntity(){
                    let operation="SaveEntity"
                    let tna=6
                    let key="11e2e476-717b-4898-ac02-693abdecdc9b"
                    let nameEntity=this.entidad.name
                    let phoneEntity=this.entidad.phone
                    let adressEntity=this.entidad.adress
                    fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+'&tna='+tna+'&key='+key+'&nameEntity='+nameEntity+'&phoneEntity='+phoneEntity+'&adressEntity='+adressEntity)
                    .then(respuesta=>respuesta.json())
                    .then((datosRespuesta=>{
                        console.log(datosRespuesta);
                }))
            }
        }
    }
</script>