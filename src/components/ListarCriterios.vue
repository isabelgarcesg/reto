<template>
    <nav class="navbar navbar-expand navbar-light bg-light" v-if="(user.userType !== 2) && (user.userType !== 3)"
        aria-disabled="">
        <div class="nav navbar-nav">


            <router-link
                :to="{ name: 'CrearCriterio', params: { StandardId: $route.params.id, servicio: $route.params.servicio } }"
                style="margin-left: 1000px;"><span class="material-icons text-muted"
                    style="font-size: 24px;">add_box</span></router-link>
        </div>
    </nav>

    <!-- Agregar margen superior al card para separarlo de la barra de navegación -->
    <div class="container">

        <div class="card" >
            <div class="card-body">
                <h4 class="card-title mb-4 text-center"><strong>Lista de criterios</strong></h4>

                    <table class="table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Observación</th>
                                <!-- AUDITOR NI EDITA NI SUBE EVIDENCIA -->
                                <th v-if="(user.userType !== 2)" aria-disabled="">Evidencia</th>
                                <!-- SOLO PARA QUE AUDITOR GUARDE SU EVIDENCIA -->
                                <th v-if="(user.userType !== 1) && (user.userType !== 3)" aria-disabled="">Observación auditor</th>
                                <th>Guardar</th>
                                <!-- AUDITOR NO VE SU PROPIA EVIDENCIA -->
                                <th v-if="(user.userType !== 2)" aria-disabled="">Observación auditor</th>
                                <!-- SOLO PARA QUE AUDITOR VEA EVIDENCIA -->
                                <th v-if="(user.userType !== 1) && (user.userType !== 3)" aria-disabled="">Evidencia</th>
                            </tr>
                        </thead>
                        <tbody>


                        <tr v-for="criterio in Criterios" :key="criterio.id">


                            <td scope="row">
                                <div class="form-group">
                                    <textarea type="text" class="form-control border-0 bg-white" id="description"
                                        v-model="criterio.description" name="description" disabled rows="5"
                                        style="text-align: justify;">
                                        <label for="floatingInput"></label></textarea>
                                </div>
                            </td>
                            <!-- AUDITOR NO PUEDE EDITAR -->
                            <td v-if="(user.userType !== 2)" aria-disabled=""><select
                                    class="form-select form-group border-0 no-hover" aria-label="Default select example"
                                    id="answer" v-model="criterio.answer" name="answer">
                                    <option selected disabled value=""></option>
                                    <option value="C">C</option>
                                    <option value="NC">NC</option>
                                    <option value="NA">NA</option>
                                </select></td>
                            <!-- SOLO PARA QUE AUDITOR VEA-->
                            <td v-if="(user.userType !== 1) && (user.userType !== 3)" aria-disabled="">{{
                                criterio.answer }}</td>

                                <!-- AUDITOR NO PUEDE EDITAR -->
                                <td v-if="(user.userType !== 2)" aria-disabled="">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="observation"
                                            v-model="criterio.observation" name="observation">
                                        <label for="floatingInput"></label>
                                    </div>
                                </td>

                                <!-- SOLO PARA QUE AUDITOR VEA-->
                                <td v-if="(user.userType !== 1) && (user.userType !== 3)" aria-disabled="">{{
                                    criterio.observation }}</td>
                                <!-- AUDITOR NO SUBE EVIDENCIA -->
                                <td v-if="(user.userType !== 2)" aria-disabled="" class="text-center">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span
                                            class="material-icons" style="color:rgb(64, 63, 63)" v-on:click="criterioSeleccionado = criterio">upload_file</span></button>
                                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                        data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <form v-on:submit.prevent="crearEvidencia(criterioSeleccionado.id)">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="staticBackdropLabel">Subir evidencia
                                                        </h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">


                                                    Nombre de la evidencia
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" name="nombreEvidencia"
                                                            v-model="evidencia.nombreEvidencia" id="nombreEvidencia"
                                                            required>
                                                    </div>
                                                    <div>
                                                        <br>
                                                    </div>
                                                    Enlace
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" name="urlEvidencia"
                                                            v-model="evidencia.urlEvidencia" id="urlEvidencia" required>
                                                    </div>
                                                    <div>
                                                        <br>
                                                    </div>
                                                    Descripción de la evidencia
                                                    <div class="form-group">
                                                        <input type="text" class="form-control" name="descripcionEvidencia"
                                                            v-model="evidencia.descripcionEvidencia"
                                                            id="descripcionEvidencia" required>
                                                    </div>


                                                </div>
                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Cargar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <!-- <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span
                                            class="material-icons" style="color:rgb(64, 63, 63)">visibility</span></button> -->

                                <button  type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    @click="consultarEvidencia(criterio.id)"><span class="material-icons"
                                        style="color:rgb(64, 63, 63)">visibility</span>
                                </button>

                                    <!-- Modal -->
                                    <div class="modal fade" id="exampleModal" tabindex="-1"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <form>
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver evidencias
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Nombre</th>
                                                                    <th>URL</th>
                                                                    <th>Descripción</th>
                                                                    <th v-if="(user.userType !== 2)" aria-disabled="">Acciones</th>
                                                                </tr>

                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="evidenciaItem in evidencia"
                                                                    :key="evidenciaItem.id">
                                                                    <td>{{ evidenciaItem.name }}</td>
                                                                    <td><a :href="evidenciaItem.link" target="_blank">Revisar</a></td>
                                                                    <td>{{ evidenciaItem.description }}</td>
                                                                    <td v-if="(user.userType !== 2)" aria-disabled=""><button type="button"
                                                                            style="margin-left: 10px; border: none; background: none;"
                                                                            data-bs-dismiss="modal"
                                                                            v-on:click="borrarEvidencia(evidenciaItem.id)">
                                                                            <span class="material-icons text-muted"
                                                                                style="font-size: 24px;">delete</span>
                                                                        </button></td>
                                                                </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Cerrar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </td>


                                <td v-if="(user.userType == 2)" aria-disabled="">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="observationAuditor"
                                            v-model="criterio.observationAuditor" name="observationAuditor">
                                      
                                    </div>
                                </td>



                            <!-- </button> -->

                                <!-- AUDITOR EDITA -->
                                <td class="text-center">
                                    <button type="submit" @click="editarCriterio(criterio.id)"><span class="material-icons">
                                            done
                                        </span></button>


                            </td>
                            <!-- PARA QUE AUDITOR VEA EVIDENCIA -->
                            <td v-if="(user.userType !== 1) && (user.userType !== 3)" aria-disabled="" >
                                <button type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    @click="consultarEvidencia(criterio.id)"><span class="material-icons"
                                        style="color:rgb(64, 63, 63)">visibility</span>
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <form>
                                                <div class="modal-header">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Ver evidencias
                                                    </h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Nombre</th>
                                                                <th>URL</th>
                                                                <th>Descripción</th>
                                                            </tr>

                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="evidencia in evidencia" :key="evidencia.id">
                                                                <td>{{ evidencia.name }}</td>
                                                                <td><a :href="evidencia.link" target="_blank">Revisar</a></td>
                                                                <td>{{ evidencia.description }}</td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Cerrar</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>


                                            <!-- AUDITOR NO VE SU PROPIA OBSERVACIÓN -->
                                <td v-if="(user.userType !== 2)" aria-disabled="">
                                    {{ criterio.observationAuditor }}
                                </td>
                            </tr>


                    </tbody>
                </table>
            </div>




        </div>




    </div>
</template>
 
<script>

export default {
    data() {
        return {
            Criterios: [], //Crea un arreglo servicios que se va a ir llenando con lo que se retornó de la consulta del link en DatosRespuesta
            evidencia: [],
        };
    },
    created: function () {
        this.consultarCriterio();
    },
    computed: {
        user() {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(typeof (user.userType));
            return user
        }
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
                        console.log(this.Criterios, "El array arrayCriteria no está vacío o no existe.", this.Criterios[1].observationAuditor);
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
                let observationCriteriaAuditor = criterio.observationAuditor;
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
                    '&observationCriteriaAuditor=' + observationCriteriaAuditor +
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
        crearEvidencia(id) {
            // CON ESTE LINK PUEDEN VER TODOS Las evidencias en el PRIMER criterio
            //https://redb.qsystems.co/QS3100/QServlet?operation=queryFileByCriteria&tna=6&fileIdCriteria=95&key=11e2e476-717b-4898-ac02-693abdecdc9b
            const criterio = this.Criterios.find((c) => c.id === id);
            if (criterio) {
                let operation = "SaveFile"
                let tna = 6
                let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
                let nombreEvidencia = this.evidencia.nombreEvidencia
                let urlEvidencia = this.evidencia.urlEvidencia
                let descripcionEvidencia = this.evidencia.descripcionEvidencia
                let idCriterio = id
                fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
                    '&tna=' + tna +
                    '&nameFile=' + nombreEvidencia +
                    '&urlFile=' + urlEvidencia +
                    '&descriptionFile=' + descripcionEvidencia +
                    '&fileIdCriteria=' + idCriterio +
                    '&fileIdStandard=' + '1' +
                    '&key=' + key
                )
                    .then(respuesta => respuesta.json())
                    .then((datosRespuesta => {
                        console.log(datosRespuesta);
                        window.location.href = "/ListarCriterios/" + this.$route.params.id + '/' + this.$route.params.servicio;


                    }))
            }
        },
        consultarEvidencia(id) {
            const criterio = this.Criterios.find((c) => c.id === id);
            console.log('Entré')
            if (criterio) {
                fetch(
                    "https://redb.qsystems.co/QS3100/QServlet?operation=queryFileByCriteria&tna=6&fileIdCriteria=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b"
                )
                    .then((respuesta) => respuesta.json())
                    // .then((datosRespuesta)=>{
                    //     console.log(datosRespuesta["arrayFiles"][0])
                    // })
                    .then((datosRespuesta) => {
                        console.log(datosRespuesta);
                        // console.log(datosRespuesta["arrayStandard"],'Hola')})
                        this.evidencia = []; //Inicializa el arreglo para entidades
                        if (
                            datosRespuesta.arrayFiles &&
                            datosRespuesta.arrayFiles.length === 0
                        ) {
                            // El array "arrayStandard" está vacío
                            console.log("El array arrayFile está vacío.");
                        } else {
                            console.log(datosRespuesta["arrayFiles"])
                            this.evidencia = datosRespuesta["arrayFiles"]

                            // El array "arrayStandard" no está vacío o no existe
                            console.log(this.evidencia, "El array arrayFiles no está vacío o no existe.");
                        }
                    })
                    .catch(console.log);
            }
        },
        borrarEvidencia(id) {
            console.log('borrarEvidencia se está ejecutando con el ID:', id);
            const Evidencia = this.evidencia.find((c) => c.id === id);
            if (Evidencia) {
                console.log(id)
                fetch("https://redb.qsystems.co/QS3100/QServlet?operation=DeleteFile&tna=6&idFile=" + id + "&key=11e2e476-717b-4898-ac02-693abdecdc9b")
                    .then(respuesta => respuesta.json())
                    .then((datosRespuesta) => {
                        console.log(datosRespuesta)
                    })
                    .catch(console.log)
            }
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
//     align-items: center;
// }


td {
            vertical-align: middle;
            text-align: center;
        }

        th {
            vertical-align: middle;
            text-align: center;
        }

.dropdown:hover .material-icons {
    /* Cambia el color de fondo en hover */
    cursor: pointer;
}

div {

    .card {
        background-color: #fdfdfd;
        display: flex;
        margin-right: auto;
        margin-left: auto;
        margin-top: auto;
        margin-bottom: auto;
    }
}
</style>

