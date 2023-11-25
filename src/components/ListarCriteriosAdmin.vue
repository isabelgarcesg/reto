<template>
    <div>
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="nav navbar-nav">


                <router-link
                    :to="{ name: 'CrearCriterio', params: { StandardId: $route.params.id, servicio: $route.params.servicio } }"
                    style="margin-left: 1000px;"><span class="material-icons text-muted"
                        style="font-size: 24px;">add_box</span></router-link>
            </div>
        </nav>




        <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
        <div class="container">




            <div class="card">
                <div class="card-body" style="width: 40rem;">
                    <h4 class="card-title mb-4 text-center"><strong>Lista de criterios</strong></h4>




                    <table class="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Observación</th>
                                <th>Observación Auditor</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="criterio in Criterios" :key="criterio.id">
                                <td scope="row">
                                    {{ criterio.description }}
                                </td>
                                <td>{{ criterio.answer }}</td>
                                <td>{{ criterio.observation }}</td>
                                <td>{{ criterio.observationAuditor }}</td>

                                <td class="dropdown">

                                    <span class="material-icons" data-bs-toggle="dropdown">
                                        expand_more
                                    </span>
                                    <!-- </button> -->
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                        <li><router-link
                                                :to="{ name: 'EditarCriterio', params: { idCrit: criterio.id, servicio: $route.params.servicio, StandardId: $route.params.id } }"
                                                class="dropdown-item">Editar</router-link></li>

                                        <li><button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                v-on:click="criterioSeleccionado = criterio">
                                                Borrar
                                            </button></li>
                                    </ul>


                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>




            </div>




        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Borrar Criterio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Esta acción eliminará el criterio permanentemente
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" v-on:click="borrarCriterio(criterioSeleccionado.id)"
                        class="btn btn-primary">Borrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            Criterios: [], //Crea un arreglo servicios que se va a ir llenando con lo que se retornó de la consulta del link en DatosRespuesta
        };
    },
    created: function () {
        this.consultarCriterio();
    },
    methods: {




        consultarCriterio() {
            let userStandardId = this.$route.params.id
            fetch(
                "https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriaByStandard&tna=6&standardIdCriteria=" + userStandardId + "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
            )
                .then((respuesta) => respuesta.json())
                // .then((datosRespuesta)=>{
                //     console.log(datosRespuesta)
                // })
                .then((datosRespuesta) => {
                    // console.log(datosRespuesta);
                    // console.log(datosRespuesta["arrayStandard"],'Hola')})
                    this.Criterios = []; //Inicializa el arreglo para entidades
                    if (
                        datosRespuesta.arrayCriteria &&
                        datosRespuesta.arrayCriteria.length === 0
                    ) {
                        // El array "arrayStandard" está vacío
                        console.log("El array arrayCriteria está vacío.");
                    } else {
                        this.Criterios = datosRespuesta["arrayCriteria"]




                        // El array "arrayStandard" no está vacío o no existe
                        console.log(this.Criterios, "El array arrayCriteria no está vacío o no existe.");
                    }
                })
                .catch(console.log);
        },
        borrarCriterio(id) {
            console.log(id)
            fetch("https://redb.qsystems.co/QS3100/QServlet?operation=DeleteCriteria&tna=6&idCriteria=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b")
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    window.location.href = "/ListarCriteriosAdmin/" + this.$route.params.id + '/' + this.$route.params.servicio




                })
                .catch(console.log)
        },








    },
};
</script>
 
<style lang="scss" scoped>
.custom-link {
    text-decoration: underline;
    /* Añade un subrayado */
    background-color: black;
    /* Cambia el color del subrayado a negro */
}




.custom-link:hover {




    color: var(--primary); //Al pasar por encima se ve azul




}




// .dropdown {
//     display: flex;
//     justify-content: center;
//     align-items: normal;
// }



.dropdown:hover .material-icons {
    /* Cambia el color de fondo en hover */
    cursor: pointer;
}

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
</style>