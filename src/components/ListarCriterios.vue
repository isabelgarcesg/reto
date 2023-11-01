<template>
    <div>
        <nav class="navbar navbar-expand navbar-light bg-light">
            <div class="nav navbar-nav">
                <!--  ServiceId: $route.params.id -->
                <!-- <router-link :to="{ name: 'CrearEstandar', params: {ServiceId:$route.params.id } }" style="margin-left: 600px;"><span class="material-icons text-muted"
              style="font-size: 24px;">add_box</span></router-link> -->


                <router-link
                    :to="{ name: 'CrearCriterio', params: { StandardId: $route.params.id, servicio: $route.params.servicio } }"
                    style="margin-left: 600px;"><span class="material-icons text-muted"
                        style="font-size: 24px;">add_box</span></router-link>
            </div>
        </nav>


        <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
        <div class="container">


            <div class="card">
                <div class="card-body">
                    <h4 class="card-title mb-4 text-center"><strong>Lista de criterios</strong></h4>
                    <form v-on:submit.prevent="editarCriterio">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Observación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="criterio in Criterios" :key="criterio.id">
                                    <td scope="row">
                                        {{ criterio.description }}
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <button type="button">{{ criterio.answer }}</button>
                                            <button type="button" class="dropdown-toggle dropdown-toggle-split"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <span class="visually-hidden">Toggle Dropdown</span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">C</a></li>
                                                <li><a class="dropdown-item" href="#">NC</a></li>
                                                <li><a class="dropdown-item" href="#">NA</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <!-- <td>{{ criterio.observation }}</td> -->

                                    <!-- <textarea type="text" class="form-control" name="observationCriteria"
                                        v-model="criterio.observationCriteria" id="observationCriteria"
                                        aria-describedby="helpId" placeholder="Observaciones" required></textarea> -->
                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Leave a comment here"
                                            name="observationCriteria" v-model="criterio.observationCriteria"
                                            id="observationCriteria"></textarea>
                                        <label for="floatingTextarea">{{ criterio.observation }}</label>
                                    </div>
                                    <td>
                                        <button type="submit"><span class="material-icons text-muted"
                                                style="font-size: 24px;">edit</span></button>

                                        <!-- Button trigger modal BOTON BORRAR CON CONFIRMACIÓN -->
                                        <!-- BOTON PARA BORRAR -->
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                            style="margin-left: 10px; border: none; background: none;">
                                            <span class="material-icons text-muted" style="font-size: 24px;">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
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
        editarCriterio(id) {
            console.log(id)
            // CON ESTE LINK PUEDEN VER TODOS LOS criterios POR TENANCY
            //https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriadByTenancy&tna=6&key=11e2e476-717b-4898-ac02-693abdecdc9b
            let operation = "UpdateCriteria"
            let tna = 6
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            let descriptionCriteria = this.criterio.descriptionCriteria
            let answerCriteria = this.criterio.answerCriteria
            let observationCriteria = this.criterio.observationCriteria
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
                    window.location.href = "/ListarCriterios/" + this.$route.params.StandardId + '/' + this.$route.params.servicio

                }))
        },
        borrarCriterio(id) {
            console.log(id)
            fetch("https://redb.qsystems.co/QS3100/QServlet?operation=DeleteCriteria&tna=6&idCriteria=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b")
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta)
                    window.location.href = "../ListarCriterios/" + this.$route.params.id


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
    color: black;
    /* Cambia el color del subrayado a negro */
}


.custom-link:hover {


    color: var(--primary); //Al pasar por encima se ve azul


}


.dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
}


.dropdown:hover .material-icons {
    /* Cambia el color de fondo en hover */
    cursor: pointer;
}
</style>