<template>
    <!-- commetn -->
      <div class="container">
        <div class="card" style="width: 40rem;">
          <div class="card-body">
      
            <h4 class="card-title mb-4 text-center"><strong>Crear Entidad</strong></h4>
            <div class="mt-4 d-flex justify-content-center align-items-center">

            <form v-on:submit.prevent="createEntity">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="name">Nombre de la entidad</label>
                    <input
                      type="text"
                      class="form-control"
                      name="name"
                      v-model="entidad.name"
                      id="name"
                      aria-describedby="helpId"
                      placeholder="Nombre"
                      required
                    >
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>
                <div>
                    <br>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone">Teléfono</label>
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      v-model="entidad.phone"
                      id="phone"
                      aria-describedby="helpId"
                      placeholder="Teléfono"
                      required
                    >
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="adress">Dirección</label>
                    <input
                      type="text"
                      class="form-control"
                      name="adress"
                      v-model="entidad.adress"
                      id="adress"
                      aria-describedby="helpId"
                      placeholder="Dirección"
                      required
                    >
                    <small id="helpId" class="form-text text-muted"></small>
                  </div>
                </div>
              </div>
              <div>
                    <br>
                </div>
              <div>
                <button type="submit" class="btn btn-primary">Enviar</button>
                <router-link :to="{ name: 'ListarEntidad'}" class="btn btn-danger" style="margin-left: 30px;">Cancelar</router-link> <!--Cambiar por un router link que solo se devuelva-->

              </div>
            </form>
          </div>
          </div>
          <!-- <div class="card-footer text-muted">
            Copyright: LifeTech Solutions 2023
          </div> -->
        </div>
      </div>

  </template>
  

<script>

    export default {
        // created:function(){
        //     this.createEntity();
        // },
        data(){
            return{
                entidad:{}
            }
        },
        methods: {   
            createEntity(){
                    let operation="SaveEntity"
                    let tna=6
                    let key="11e2e476-717b-4898-ac02-693abdecdc9b"
                    let nameEntity=this.entidad.name
                    let phoneEntity=this.entidad.phone
                    let adressEntity=this.entidad.adress
                    fetch('https://redb.qsystems.co/QS3100/QServlet?operation='+operation+
                    '&tna='+tna+
                    '&key='+key+
                    '&nameEntity='+nameEntity+
                    '&phoneEntity='+phoneEntity+
                    '&adressEntity='+adressEntity)
                    .then(respuesta=>respuesta.json())
                    .then((datosRespuesta=>{
                        console.log(datosRespuesta);
                        window.location.href='ListarEntidad'
                        
                }))
            }
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

input{
    border-radius:10px;
}

select{
    border-radius:10px;
}

</style>







