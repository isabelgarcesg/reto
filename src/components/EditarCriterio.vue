<template>
  <div class="container">
    <div class="card" style="width: 40rem;">
      <div class="card-header">
        <b>Edición de criterio</b>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="editarCriterio">
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
                <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria" id="answerCriteria" value="C">
                <label class="form-check-label" for="inlineRadio1">C</label>
              </div>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria" id="answerCriteria" value="NC">
                <label class="form-check-label" for="inlineRadio2">NC</label>
              </div>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" name="answerCriteria" v-model="criterio.answerCriteria" id="answerCriteria" value="NA">
                <label class="form-check-label" for="inlineRadio3">NA</label>
              </div>
            </div>



            <div>
              <br>
            </div>

            <div class="col-md-12">
              <div class="form-group">
                <label for="observationCriteria">Obervaciones</label>
                <textarea type="text" class="form-control radio" name="observationCriteria" v-model="criterio.observationCriteria"
                  id="observationCriteria" aria-describedby="helpId" placeholder="Obervaciones" required></textarea>
                <small id="helpId" class="form-text text-muted"></small>
              </div>
            </div>
          </div>
          <div><br></div>
          <div>
            <button type="submit" class="btn btn-primary">Enviar</button>
            <!-- CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE -->
            <!-- <router-link :to="{ name: 'Listarcriterio'}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link> Cambiar por un router link que solo se devuelva -->
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
  data() {
    return {
      criterio: {}
    }
  },
  methods: {
    editarCriterio() {
      // CON ESTE LINK PUEDEN VER TODOS LOS criterios POR TENANCY
      //https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriadByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
      let operation = "UpdateCriteria"
      let tna = 6
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      let descriptionCriteria = this.criterio.descriptionCriteria
      let answerCriteria = this.criterio.answerCriteria
      let observationCriteria = this.criterio.observationCriteria
      let idCriteria = 82
      let standardIdCriteria = 14           // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE, id de servicio
      let serviceIdCriteria = 21

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
          //   window.location.href='Listarcriterio'   // CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE

        }))
    }
  }
}
</script>


<style lang="scss" scoped>
div {
  .card {
    background-color: var(--light-blue);
  }
}

.radio {
  border-radius: 10px;
}

.custom-label {
  margin-right: 20px;
  /* Ajusta el valor según tu preferencia para el espacio */
}

.custom-radio {
  margin-left: 20px;
  /* Ajusta el valor según tu preferencia para el espacio */
}
</style>

