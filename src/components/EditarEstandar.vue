
<!--HOLA ISA-->
<template>
    <div class="container">
        <div class="card" style="width: 40rem;">
            <div class="card-header">
                <b>Creación de estándar</b>
            </div>
            <div class="card-body">
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
                        <!-- CAMBIAR CUANDO ESTE DENTRO DE DESPLEGABLEEE -->
                        <!-- <router-link :to="{ name: 'Listarestandar'}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link> Cambiar por un router link que solo se devuelva -->
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
</style>
