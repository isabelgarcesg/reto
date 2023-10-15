<template>   
    <div class="container">
      <div class="card" style="width: 40rem;">
        <div class="card-header">
          <b>Creación de servicio</b>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="createService">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nombre del servicio</label>
                  <input
                    type="text"
                    class="form-control"
                    name="nameService"
                    v-model="servicio.nameService"
                    id="nameService"
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
                  <label for="descriptionService">Descripción del servicio</label>
                  <input
                    type="text"
                    class="form-control"
                    name="descriptionService"
                    v-model="servicio.descriptionService"
                    id="descriptionService"
                    aria-describedby="helpId"
                    placeholder="Descripción"
                    required
                  >
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
            </div>
            <div><br></div>
            <div>
              <button type="submit" class="btn btn-primary">Enviar</button>
              <!-- <router-link :to="{ name: 'Listarservicio'}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link> Cambiar por un router link que solo se devuelva -->

            </div>
          </form>
        </div>
        <!-- <div class="card-footer text-muted">
          Copyright: LifeTech Solutions 2023
        </div> -->
      </div>
    </div>
</template>


<script>

  export default {
      // created:function(){
      //     this.createEntity();
      // },
      data(){
          return{
              servicio:{}
          }
      },
      methods: {   
        createService(){
                  let operation="SaveService"
                  let tna=6
                  let key="11e2e476-717b-4898-ac02-693abdecdc9b"
                  let nameService=this.servicio.nameService
                  let descriptionService=this.servicio.descriptionService
                  let entityIdService=82
                  fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+
                  '&tna='+tna+
                  '&key='+key+
                  '&nameService='+nameService+
                  '&descriptionService='+descriptionService+
                  '&entityIdService='+entityIdService)
                  .then(respuesta=>respuesta.json())
                  .then((datosRespuesta=>{
                      console.log(datosRespuesta);
                    //   window.location.href='Listarservicio'
                      
              }))
          }
      }
  }
</script>


<style lang="scss" scoped>
    div{
        .card{
            background-color: var(--light-blue);
        }
    }
    input{
        border-radius:10px;
    }
    select{
        border-radius:10px;
    }
</style>
