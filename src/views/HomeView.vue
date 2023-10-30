<template>
    <main class="home-page">
      <h1>LifeTech Solutions</h1>
      <p>This is the home page</p>
      <div class="container">
        <h2>Servicios</h2>
        <div v-for="servicio in Servicios" :key="servicio.id">
          <h2>{{ servicio.name }}</h2>
          <div>
            <div v-for="estandar in getEstandaresByService(servicio.id)" :key="estandar.id">
              <div class="progress" role="progressbar" :aria-label="estandar.name">
                <div class="progress-bar" :class="getProgressBarClass(calcularPorcentajeCriteriosC(estandar.id))">
                  {{ calcularPorcentajeCriteriosC(estandar.id) }}%
                </div>
                <div class="progress-bar-label">{{ estandar.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>

<script>



export default {
    data() {
    return {
        Criterios: [],
        Servicios: [],
        Estandares: [],
    };
  },
  created(){
        this.consultarCriterio();
        this.consultarServicio();
        //this.consultarEstandar();
    },
    methods:{
      consultarServicio() {
      let userEntityId = 101; // id entidad
      fetch(
        "https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByEntity&entityIdService=" +
          userEntityId +
          "&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b"
      )
        .then((respuesta) => respuesta.json())
        .then((datosRespuesta) => {
          this.Servicios = [];
          if (
            datosRespuesta.arrayService &&
            datosRespuesta.arrayService.length === 0
          ) {
            console.log("El array arrayService está vacío.");
          } else {
            this.Servicios = datosRespuesta["arrayService"];
            console.log(
              this.Servicios,
              "El array arrayService no está vacío o no existe."
            );

            // After fetching services, fetch standards for each service
            this.fetchStandardsForServices();
          }
        })
        .catch(console.log);
    },
      fetchStandardsForServices() {
        // Iterate through the services and fetch standards for each service
        this.Servicios.forEach((servicio) => {
          fetch(
            "https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardByService&tna=6&serviceIdStandard=" +
            servicio.id + // Assuming the service ID is in the 'id' property
            "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
          )
            .then((respuesta) => respuesta.json())
            .then((datosRespuesta) => {
              if (
                datosRespuesta.arrayStandard &&
                datosRespuesta.arrayStandard.length === 0
              ) {
                console.log("El array arrayStandard está vacío.");
              } else {
                // Store the standards for this service
                servicio.standards = datosRespuesta["arrayStandard"];
                console.log(
                  servicio.standards,
                  "El array arrayStandard no está vacío o no existe."
                );
              }
            })
            .catch(console.log);
        });
      },
        consultarCriterio() {
            let userStandardId = 36
            fetch(
                "https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriaByStandard&tna=6&standardIdCriteria=" + userStandardId + "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
            )
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    this.Criterios = []; //Inicializa el arreglo para entidades
                    if (datosRespuesta.arrayCriteria && datosRespuesta.arrayCriteria.length === 0) {
                        console.log("El array arrayCriteria está vacío.");
                    } else {
                        this.Criterios = datosRespuesta["arrayCriteria"];
                        console.log(this.Criterios, "El array arrayCriteria no está vacío o no existe.");
                        this.calcularPorcentajeCriteriosC();
                    }
                })
                .catch(console.log);
        },
        getEstandaresByService(serviceId) {
      return this.Estandares.filter((estandar) => estandar.serviceID === serviceId);
    },

    calcularPorcentajeCriteriosC(standardId) {
      const criterios = this.Criterios.filter((criterio) => criterio.standardID === standardId);
      const criteriosC = criterios.filter((criterio) => criterio.answer === 'C');
      return (criteriosC.length / criterios.length) * 100;
    },

    getProgressBarClass(porcentaje) {
      if (porcentaje === 100) {
        return 'progress-bar bg-success';
      } else if (porcentaje >= 75) {
        return 'progress-bar bg-warning text-dark';
      } else if (porcentaje >= 50) {
        return 'progress-bar bg-info text-dark';
      } else {
        return 'progress-bar bg-danger';
      }
    },
  },
};
</script>