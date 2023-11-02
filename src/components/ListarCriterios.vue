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
                <div class="card-body">
                    <h4 class="card-title mb-4 text-center"><strong>Lista de criterios</strong></h4>


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
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="description"
                                            v-model="criterio.description" name="description">
                                        <label for="floatingInput"></label>
                                    </div>
                                </td>
                                <td><select class="form-select form-group" aria-label="Default select example" id="answer"
                                        v-model="criterio.answer" name="answer">
                                        <option selected disabled value=""></option>
                                        <option value="C">C</option>
                                        <option value="NC">NC</option>
                                        <option value="NA">NA</option>
                                    </select></td>
                                <td>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="observation"
                                            v-model="criterio.observation" name="observation">
                                        <label for="floatingInput"></label>
                                    </div>
                                </td>
                                <td class="dropdown">

                                    <span class="material-icons" data-bs-toggle="dropdown">
                                        expand_more
                                    </span>
                                    <!-- </button> -->
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">


                                        <li><button type="submit" class="dropdown-item"
                                                @click="editarCriterio(criterio.id)">Editar</button></li>


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
        editarCriterio(id) {
            const criterio = this.Criterios.find((c) => c.id === id);
            if (criterio) {
                let operation = "UpdateCriteria";
                let tna = 6;
                let key = "11e2e476-717b-4898-ac02-693abdecdc9b";
                let descriptionCriteria = criterio.description;
                let answerCriteria = criterio.answer;
                let observationCriteria = criterio.observation;
                let idCriteria = id;
                let standardIdCriteria = this.$route.params.id;
                let serviceIdCriteria = this.$route.params.servicio;
                console.log(id, criterio.observation, 'Hola')
                fetch(
                    'https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
                    '&tna=' + tna +
                    '&key=' + key +
                    '&descriptionCriteria=' + descriptionCriteria +
                    '&answerCriteria=' + answerCriteria +
                    '&observationCriteria=' + observationCriteria +
                    '&standardIdCriteria=' + standardIdCriteria +
                    '&serviceIdCriteria=' + serviceIdCriteria +
                    '&idCriteria=' + idCriteria
                )
                    .then((respuesta) => respuesta.json())
                    .then((datosRespuesta) => {
                        console.log(datosRespuesta);
                        window.location.href = "/ListarCriterios/" + this.$route.params.id + '/' + this.$route.params.servicio;
                    });
            }
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
    background-color: black;
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