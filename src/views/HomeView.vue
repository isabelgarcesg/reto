<template>
  <main class="home-page">
    <div class="header">
      <div class="company-info">
        
        <!-- https://i.pinimg.com/originals/85/95/f4/8595f4b711e503bc72fe396e5043e0c2.png -->
          <img class="company-logo" src="https://static.vecteezy.com/system/resources/previews/027/706/688/original/digital-health-logo-png.png" alt="Company Logo" />
        <h1 class="entity-name">{{ entidad.name }}</h1>
      </div>
    </div>
    <div class="container">
      <br>
      <h2>Cumplimiento por servicios</h2>
      <div v-for="servicio in Servicios" :key="servicio.id" class="service-card">
        <h3>{{ servicio.name }}</h3>

        <div>
          <div v-for="estandar in servicio.standards" :key="estandar.id" class="progress-card">
            <h4>{{ estandar.name }}</h4>
            <div class="progress">
              <div
                class="progress-bar"
                :class="getProgressBarClass(calcularPorcentajeCriteriosC(estandar))"
                :style="{ width: (calcularPorcentajeCriteriosC(estandar)) + '%' }"
              >
                {{ calcularPorcentajeCriteriosC(estandar) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
  <img class="logo" src="@/assets/logo.png" alt="LifeTech Solutions Logo" />
  <span>&copy; {{ new Date().getFullYear() }} LifeTech Solutions</span>
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
      entidad: {}
    };
  },
  created() {
    //this.consultarCriterio();
    this.consultarServicio();
    this.leerEntidades();
    //this.consultarEstandar();
  },
  computed: {
    user() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user;
    }
  },
  methods: {
    leerEntidades() {
      let operation = "queryEntityById"
      let tna = 6
      let idEntity = this.user.entityID
      let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
        operation +
        '&tna=' +
        tna +
        '&idEntity=' +
        idEntity +
        '&key='
        + key)
        .then(respuesta => respuesta.json())
        .then((datosRespuesta) => {
          console.log(datosRespuesta['arrayEntity'][0])
          this.entidad = datosRespuesta['arrayEntity'][0];
        })
        .catch(console.log)


    },
    consultarServicio() {
      let userEntityId = this.user.entityID; // id entidad
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
              "El array arrayService no está vacío o no existe.", this.user.entityID, 'FUNCIONA USUARIO'
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
              // After fetching standards, fetch criteria for each standard
              this.fetchCriteriaForStandards(servicio.standards);
            }
          })
          .catch(console.log);
      });
    },
    fetchCriteriaForStandards(standards) {
      // Iterate through the standards and fetch criteria for each standard
      standards.forEach((estandar) => {
        fetch(
          "https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriaByStandard&tna=6&standardIdCriteria=" +
          estandar.id +
          "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
        )
          .then((respuesta) => respuesta.json())
          .then((datosRespuesta) => {
            if (
              datosRespuesta.arrayCriteria &&
              datosRespuesta.arrayCriteria.length === 0
            ) {
              console.log("El array arrayCriteria está vacío.");
            } else {
              // Store the criteria for this standard
              estandar.criteria = datosRespuesta["arrayCriteria"];
              console.log(
                estandar.criteria,
                "El array arrayCriteria no está vacío o no existe."
              );
            }
          })
          .catch(console.log);
      });
    },
    //     getEstandaresByService(serviceId) {
    //   return this.Estandares.filter((estandar) => estandar.serviceID === serviceId);
    // },

    calcularPorcentajeCriteriosC(estandar) {
      if (!estandar.criteria || estandar.criteria.length === 0) {
        return 0; // No hay criterios
      }

      const criteriosC = estandar.criteria.filter((criterio) => criterio.answer === 'C');
      const resultado = (criteriosC.length / estandar.criteria.length) * 100;
      const resultadoRedondeado = resultado.toFixed(1);
      return (resultadoRedondeado)
    },

    getProgressBarClass(porcentaje) {
      if (porcentaje == 100) {
        return 'progress-bar bg-success';
      } else if (porcentaje >= 75) {
        return 'progress-bar bg-info text-dark';
      } else if (porcentaje >= 50) {
        return 'progress-bar bg-warning text-dark';
      } else {
        return 'progress-bar bg-danger';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Adjust as needed */
}

.service-card {
  flex: 0 0 calc(30% - 20px); /* Adjust as needed */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  text-align: left;
  max-width: 400px;
  box-sizing: border-box; /* Ensure padding and margin are included in the width calculation */
}

h2 {
  width: 100%; /* Ensure the title spans the full width */
  text-align: center; /* Center the title */
  margin-bottom: 16px; /* Add some space below the title */
  margin-top: 16px;
}
.entity-name {
  font-size: 28px; /* Ajusta el tamaño del nombre de la entidad */
  font-weight: bold; /* Aplica negrita al nombre de la entidad */
}

.home-page {
  display: flex;
  flex-direction: column;
  align-items: normal;
  background-color: #f0f0f0; /* Color de fondo */
  padding: 20px;
  text-align: center;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: justify ;
  background-color: var(--dark);
  width: 100%;
}

.company-info {
  display: flex;
  flex-direction: row;
  align-items: justify;
  width: 200px;

}
.company-logo {
  vertical-align: text-bottom;
    display: flex;
    width: 140px;
    margin-left: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
}

h1 {
  font-size: 24px;
    color: #edeef5;
    margin-left: 80px;
    margin-bottom: 5px;
    margin-top: 50px;
  
}

.service-card {
  background-color: #fff; /* Color de fondo del card */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra del card */
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  text-align: left;
  max-width: 400px;
}

h3 {
  font-size: 18px;
  color: #333; 
  text-align: center;
}

.progress-card {
  margin-top: 10px;
}

h4 {
  font-size: 16px;
  color: #1a237e; /* Color de texto */
}

.progress {
  background-color: #ccc; /* Color de fondo de la barra de progreso */
  height: 20px;
  border-radius: 10px;
}

.progress-bar {
  border-radius: 10px;
  text-align: center;
  color: #fff; /* Color de texto en la barra de progreso */
  font-weight: bold;
}

.bg-success {
  background-color: #28a745; /* Color de fondo para éxito */
}

.bg-info {
  background-color: #17a2b8; /* Color de fondo para información */
}

.bg-warning {
  background-color: #ffc107; /* Color de fondo para advertencia */
}

.bg-danger {
  background-color: #dc3545; /* Color de fondo para error */
}
.logo {
  max-width: 40px; /* Ajusta el tamaño del logo según tus preferencias */
  margin-right: 10px; /* Agrega espacio entre el logo y el texto */
  vertical-align: middle; /* Centra verticalmente el logo junto al texto */
}

/* Estilo adicional para el texto de copyright si es necesario */
span {
  font-size: 16px; /* Ajusta el tamaño del texto según tus preferencias */
  color: #333; /* Color de texto */
}

</style>