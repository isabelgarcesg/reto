<template>
  <div class="container">
    <div class="card" style="width: 40rem;">

      <div class="card-body">
        <h4 class="card-title mb-4 text-center"><strong>Crear Criterios</strong></h4>
        <div class="mt-4 d-flex justify-content-center align-items-center">

          <form v-on:submit.prevent="createCriteria">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Descripción del criterio</label>
                  <textarea type="text" class="form-control radio" name="descriptionCriteria"
                    v-model="criterio.descriptionCriteria" id="descriptionCriteria" aria-describedby="helpId"
                    placeholder="Criterio" required></textarea>
                  <small id="helpId" class="form-text text-muted"></small>
                </div>
              </div>

              <div>
                <br>
              </div>

              <div class="col-md-12">
                <label for="name" class="custom-label">Estado</label>
                <div class="form-check form-check-inline custom-radio">
                  <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria"
                    id="answerCriteria" value="C">
                  <label class="form-check-label" for="inlineRadio1">C</label>
                </div>
                <div class="form-check form-check-inline custom-radio">
                  <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria"
                    id="answerCriteria" value="NC">
                  <label class="form-check-label" for="inlineRadio2">NC</label>
                </div>
                <div class="form-check form-check-inline custom-radio">
                  <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria"
                    id="answerCriteria" value="NA">
                  <label class="form-check-label" for="inlineRadio3">NA</label>
                </div>
              </div>



              <div>
                <br>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="observationCriteria">Obervaciones</label>
                  <textarea type="text" class="form-control radio" name="observationCriteria"
                    v-model="criterio.observationCriteria" id="observationCriteria" aria-describedby="helpId"
                    placeholder="Obervaciones" required></textarea>
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
      criterio: {}
    }
  },
  methods: {
    createCriteria() {
      // CON ESTE LINK PUEDEN VER TODOS LOS criterios POR TENANCY
      //https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriadByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
      let operation = "SaveCriteria"
      let tna = 6
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      let descriptionCriteria = this.criterio.descriptionCriteria
      let answerCriteria = this.criterio.answerCriteria
      let observationCriteria = this.criterio.observationCriteria
      let standardIdCriteria = 14           // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE, id de servicio
      let serviceIdCriteria = 21
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
        '&tna=' + tna +
        '&key=' + key +
        '&descriptionCriteria=' + descriptionCriteria +
        '&answerCriteria=' + answerCriteria +
        '&observationCriteria=' + observationCriteria +
        '&standardIdCriteria=' + standardIdCriteria +
        '&serviceIdCriteria=' + serviceIdCriteria
      )
        .then(respuesta => respuesta.json())
        .then((datosRespuesta => {
          console.log(datosRespuesta);
          window.location.href = "/ListarCriterios/" + this.$route.params.StandardId +'/'+ this.$route.params.servicio

        }))
    },
    volver() {

window.location.href = "/ListarCriterios/" + this.$route.params.StandardId +'/'+ this.$route.params.servicio //hay que poner lo mismo del id acá

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

