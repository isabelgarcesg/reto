<template>
  <div class="container">
    <div class="card" style="width: 40rem;">

      <div class="card-body">
        <h4 class="card-title mb-4 text-center"><strong>Editar Criterio</strong></h4>
        <div class="mt-4 d-flex justify-content-center align-items-center">

        <form v-on:submit.prevent="editarCriterio">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label for="name">Descripción del criterio</label>
                <textarea type="text" class="form-control radio" name="description"
                  v-model="criterio.description" id="description" aria-describedby="helpId"
                  placeholder="Criterio" required></textarea>
                <small id="helpId" class="form-text text-muted"></small>
              </div>
            </div>

            <div>
              <br>
            </div>

            <div class="col-md-12">
              <label for="name" class="custom-label" style="margin-right: 10px;">Estado</label>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" name="answer" v-model="criterio.answer" id="answer" value="C">
                <label class="form-check-label" for="inlineRadio1">C</label>
              </div>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" name="answer" v-model="criterio.answer" id="answer" value="NC">
                <label class="form-check-label" for="inlineRadio2">NC</label>
              </div>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" name="answer" v-model="criterio.answer" id="answer" value="NA">
                <label class="form-check-label" for="inlineRadio3">NA</label>
              </div>
            </div>



            <div>
              <br>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="observation">Obervaciones</label>
                <textarea type="text" class="form-control radio" name="observation" v-model="criterio.observation"
                  id="observationCriteria" aria-describedby="helpId" placeholder="Obervaciones" required></textarea>
                <small id="helpId" class="form-text text-muted"></small>
              </div>
            </div>
          </div>
          <div><br></div>
          <div>
            <button type="submit" class="btn btn-primary">Enviar</button>
            <!-- CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE -->
            <router-link :to="{ name: 'ListarCriteriosAdmin', params: { id: $route.params.StandardId, servicio: $route.params.servicio}}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link>
          </div>
        </form>
      </div>
      </div>
      <!-- <div class="card-footer text-muted">
        Copyright: LifeTech Solutions 2023
      </div> -->
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
  created: function (){
        this.leerCriterio();
    },
  methods: {
    leerCriterio(){
      let operation = "queryCriteriaById"
      let tna = 6
      let idCriteria = this.$route.params.idCrit
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
          operation +
          '&tna=' +
          tna +
          '&idCriteria=' +
          idCriteria +
          '&key='
          + key) 
          .then(respuesta => respuesta.json())
          .then((datosRespuesta) => {
              console.log(datosRespuesta['arrayCriteria'][0]) 
              this.criterio = datosRespuesta['arrayCriteria'][0];
          })
          .catch(console.log)      
    },
    
    editarCriterio() {
      // CON ESTE LINK PUEDEN VER TODOS LOS criterios POR TENANCY
      //https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriadByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
      let operation = "UpdateCriteria"
      let tna = 6
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      let descriptionCriteria = this.criterio.description
      let answerCriteria = this.criterio.answer
      let observationCriteria = this.criterio.observation
      let idCriteria = this.$route.params.idCrit
      let standardIdCriteria = this.$route.params.StandardId          // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE, id de servicio
      let serviceIdCriteria = this.$route.params.servicio

      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
        '&tna=' + tna +
        '&key=' + key +
        '&descriptionCriteria=' + descriptionCriteria +
        '&answerCriteria=' + answerCriteria +
        '&observationCriteria=' + observationCriteria +
        '&standardIdCriteria=' + standardIdCriteria +
        '&serviceIdCriteria=' + serviceIdCriteria +
        '&idCriteria=' + idCriteria
        )
        .then(respuesta => respuesta.json())
        .then((datosRespuesta => {
          console.log(datosRespuesta);
          window.location.href = "/ListarCriteriosAdmin/" + this.$route.params.StandardId  +'/' +this.$route.params.servicio

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

input {
border-radius: 10px;
}

select {
border-radius: 10px;
}
</style>

