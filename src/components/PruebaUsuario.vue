<template>
    <!-- <div>
    <label for="userType" class="form-label">Tipo de entidad</label>
    <select class="form-select" id="userEntityId" v-model="entidad.userEntityId" required>
        <option selected disabled value=""></option>
        <option v-for="entidad in Entidades" :key="entidad.id" :value="entidad.id">{{ entidad.name }}</option>
    </select>
    <div class="invalid-feedback">
        Please select a valid state.
    </div>
</div> -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Entidades
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

<li v-for="entidad in Entidades" :key="entidad.id"><router-link :to="{ name: 'ListarUsuario', params: { id: entidad.id }}" class="dropdown-item">{{entidad.name}}</router-link></li>
  </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
            Entidades: [], //Crea un arreglo Entidades que se va a ir llenando con lo que se retornó de la consulta dle link en DatosRespuesta
        };
    },
    created: function () {
        this.consultarEntidad();
    },
    methods: {
        consultarEntidad() {
            // let EntityId = this.entidad.userEntityId
            // "https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=6&userEntityId=" + EntityId +"&key=11e2e476-717b-4898-ac02-693abdecdc9b"



            fetch(
                "https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b"
            )
                .then((respuesta) => respuesta.json())
                // .then((datosRespuesta)=>{
                //     console.log(datosRespuesta)
                // })
                .then((datosRespuesta) => {
                    //   console.log(datosRespuesta["arrayEntity"][0].name, "hola1");
                    this.Entidades = []; //Inicializa el arreglo para entidades
                    if (
                        datosRespuesta.arrayEntity &&
                        datosRespuesta.arrayEntity.length === 0
                    ) {
                        // El array "arrayEntity" está vacío
                        console.log("El array arrayEntity está vacío.");
                    } else {
                        this.Entidades = datosRespuesta["arrayEntity"]

                        // El array "arrayEntity" no está vacío o no existe
                        console.log(this.Entidades, "El array arrayEntity NO está vacio", datosRespuesta.arrayEntity);
                    }
                })
                .catch(console.log);
        }

    }



}
</script >

<style lang="scss" scoped>
    .dropdown{
        display: flex;
        align-items: center;

}
</style>