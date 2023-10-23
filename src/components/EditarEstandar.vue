
<!--HOLA ISA-->
<template>
    <div class="container">
        <div class="card" style="width: 40rem;">

            <div class="card-body">
                <h4 class="card-title mb-4 text-center"><strong>Editar estándar</strong></h4>
                <div class="mt-4 d-flex justify-content-center align-items-center">

                    <form v-on:submit.prevent="editarStandar">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="name">Nombre del estándar</label>
                                    <input type="text" class="form-control radio" name="nameStandard"
                                        v-model="estandar.nameStandard" id="nameStandard" aria-describedby="helpId"
                                        placeholder="Estándar" required>
                                    <small id="helpId" class="form-text text-muted"></small>
                                </div>
                            </div>
                            <div>
                                <br>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="descriptionStandard">Descripción del estándar</label>
                                    <textarea type="text" class="form-control radio" name="descriptionStandard"
                                        v-model="estandar.descriptionStandard" id="descriptionStandard"
                                        aria-describedby="helpId" placeholder="Descripción" required></textarea>
                                    <small id="helpId" class="form-text text-muted"></small>
                                </div>
                            </div>
                        </div>
                        <div><br></div>
                        <div>
                            <button type="submit" class="btn btn-primary">Enviar</button>
                            <!-- <button type="button" v-on:click="volver" class="btn btn-danger" style="margin-left: 10px">
                                Cancelar
                            </button> -->
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
            estandar: {}
        }
    },
    methods: {
        editarStandar() {
            let operation = "UpdateStandard"
            let tna = 6
            let nameStandard = this.estandar.nameStandard
            let descriptionStandard = this.estandar.descriptionStandard
            let serviceIdStandard = this.$route.params.idServ
            let idStandard = this.$route.params.idEst
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"


            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' + operation +
                '&tna=' + tna +
                '&key=' + key +
                '&nameStandard=' + nameStandard +
                '&descriptionStandard=' + descriptionStandard +
                '&idStandard=' + idStandard +
                '&serviceIdStandard=' + serviceIdStandard)
                .then(respuesta => respuesta.json())
                .then((datosRespuesta => {
                    console.log(datosRespuesta)
                    // window.location.href = '../ListarEstandares/' + this.$route.params.idServ

                }))


        }


        // volver() {

        //     window.location.href = '../ListarEstandares/' + this.$route.params.idServ

        // }

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
