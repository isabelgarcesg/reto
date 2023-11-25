
<!--HOLA ISA-->
<template>
    <div class="container">
        <div class="card">

            <div class="card-body">
                <h4 class="card-title mb-4 text-center"><strong>Editar estándar</strong></h4>
                <div class="mt-4 d-flex justify-content-center align-items-center">

                    <form v-on:submit.prevent="editarStandar">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="name">Nombre del estándar</label>
                                    <input type="text" class="form-control radio" name="name"
                                        v-model="estandar.name" id="name" aria-describedby="helpId"
                                        placeholder="Estándar" required>
                                    <small id="helpId" class="form-text text-muted"></small>
                                </div>
                            </div>
                            <div>
                                <br>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="description">Descripción del estándar</label>
                                    <textarea type="text" class="form-control radio" name="description"
                                        v-model="estandar.description" id="description"
                                        aria-describedby="helpId" placeholder="Descripción" required></textarea>
                                    <small id="helpId" class="form-text text-muted"></small>
                                </div>
                            </div>
                        </div>
                        <div><br></div>
                        <div>
                            <button type="submit" class="btn btn-primary">Enviar</button>
                            <router-link :to="{ name: 'ListarEstandares', params:{id:$route.params.idServ}}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link>          
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

    created: function (){
        this.leerEstandar();
    },
    methods: {
        leerEstandar(){
            let operation = "queryStandardById"
            let tna = 6
            let idStandard = this.$route.params.idEst
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            fetch('https://redb.qsystems.co/QS3100/QServlet?operation=' +
                operation +
                '&tna=' +
                tna +
                '&idStandard=' +
                idStandard +
                '&key='
                + key)
                .then(respuesta => respuesta.json())
                .then((datosRespuesta) => {
                    console.log(datosRespuesta['arrayStandard'][0])
                    this.estandar = datosRespuesta['arrayStandard'][0];
                })
                .catch(console.log)
        },
        editarStandar() {
            let operation = "UpdateStandard"
            let tna = 6
            let nameStandard = this.estandar.name
            let descriptionStandard = this.estandar.description
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
                    window.location.href = '../../ListarEstandares/' + this.$route.params.idServ

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
