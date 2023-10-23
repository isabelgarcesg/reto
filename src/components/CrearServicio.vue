<template>
  <div class="container">
    <div class="card" style="width: 40rem;">

      <div class="card-body">
        <h4 class="card-title mb-4 text-center"><strong>Crear Servicio</strong></h4>
        <div class="mt-4 d-flex justify-content-center align-items-center">

          <form v-on:submit.prevent="createService">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nombre del servicio</label>
                  <input type="text" class="form-control radio" name="nameService" v-model="servicio.nameService"
                    id="nameService" aria-describedby="helpId" placeholder="Servicio" required>
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
              <div>
                <br>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="descriptionService">Descripción del servicio</label>
                  <textarea type="text" class="form-control radio" name="descriptionService"
                    v-model="servicio.descriptionService" id="descriptionService" aria-describedby="helpId"
                    placeholder="Descripción" required></textarea>
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>
            </div>
            <div><br></div>
            <div>
              <button type="submit" class="btn btn-primary">Enviar</button>
              
              <button type="button" v-on:click="volver" class="btn btn-danger" style="margin-left: 10px">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      servicio: {}
    }
  },
  methods: {
    createService() {
      // CON ESTE LINK PUEDEN VER TODOS LOS SERVICIOS POR TENANCY
      //https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
      let operation = "SaveService"
      let tna = 6
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      let nameService = this.servicio.nameService
      let descriptionService = this.servicio.descriptionService
      let entityIdService = this.$route.params.entityId           // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
        '&tna=' + tna +
        '&key=' + key +
        '&nameService=' + nameService +
        '&descriptionService=' + descriptionService +
        '&entityIdService=' + entityIdService)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta => {
          console.log(datosRespuesta);
            window.location.href='../Listarservicios/'+this.$route.params.entityId   // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE

        }))
    },

    volver() {

      window.location.href = "../ListarServicios/" + this.$route.params.entityId  //hay que poner lo mismo del id acá

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
input {
  border-radius: 10px;
}

select {
  border-radius: 10px;
}
</style>
