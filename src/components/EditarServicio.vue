<template>  
    <div class="container">
      <div class="card" style="width: 40rem;">

        <div class="card-body">
          <h4 class="card-title mb-4 text-center"><strong>Editar Serivcio</strong></h4>
        <div class="mt-4 d-flex justify-content-center align-items-center">

          <form v-on:submit.prevent="editarServicio">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nombre del servicio</label>
                  <input
                    type="text"
                    class="form-control radio"
                    name="name"
                    v-model="servicio.name"
                    id="name"
                    aria-describedby="helpId"
                    placeholder="Servicio"
                    required
                  >
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
              <div>
                  <br>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="description">Descripción del servicio</label>
                  <textarea
                    type="text"
                    class="form-control radio"
                    name="description"
                    v-model="servicio.description"
                    id="description"
                    aria-describedby="helpId"
                    placeholder="Descripción"
                    required
                  ></textarea>
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
            </div>
            <div><br></div>
            <div>
              <button type="submit" class="btn btn-primary">Enviar</button>
              <!-- CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE -->
              <router-link :to="{ name: 'ListarServicios', params:{id:$route.params.entity}}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link>          
            </div>
          </form>
        </div>
        </div>
      </div>
    </div>
</template>


<script>


export default {
    data(){
        return{
            servicio:{}
        }
    },
    created: function (){
        this.leerServicio();
    },
    methods:{
        leerServicio() {
          let operation = "queryServiceById"
          let tna = 6
          let idService = this.$route.params.idServ
          let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
          fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
              operation +
              '&tna=' +
              tna +
              '&idService=' +
              idService +
              '&key='
              + key) 
              .then(respuesta => respuesta.json())
              .then((datosRespuesta) => {
                  console.log(datosRespuesta['arrayService'][0])
                  this.servicio = datosRespuesta['arrayService'][0];
              })
              .catch(console.log)
        },
        editarServicio(){
            let operation="UpdateService"
            let tna=6
            let key="11e2e476-717b-4898-ac02-693abdecdc9b"
            let nameService=this.servicio.name
            let descriptionService=this.servicio.description
            let entityIdService=this.$route.params.entity  
            let idService = this.$route.params.idServ
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+
                  '&tna='+tna+
                  '&key='+key+
                  '&nameService='+nameService+
                  '&descriptionService='+descriptionService+
                  '&entityIdService='+entityIdService+
                  '&idService='+idService)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta=>{
                console.log(datosRespuesta);
                window.location.href = "../../ListarServicios/" + this.$route.params.entity  
            }))          
        }
    }


}


</script>


<style lang="scss" scoped>
div {

.card {
  background-color: #fdfdfd;
  display: flex;
  margin-right: 10rem;
  margin-left: 15rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
}
input{
    border-radius:10px;
}

select{
    border-radius:10px;
}
</style>
