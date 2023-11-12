<template>
    <section class="vh-100">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6 text-dark-alt">

                    <div class="px-5 ms-xl-4">
                        <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
                        <div class="logo">
                            <img src="../assets/logo.png" alt="Vue"> <!--CAMBIAR ESTO LUEGO A ALGO MAS-->
                        </div>
                    </div>

                    <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                        <form style="width: 23rem" v-on:submit.prevent="login">

                            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Iniciar sesión</h3>

                            <div class="form-outline mb-4">
                                <input type="text" id="form2Example18" class="form-control form-control-lg" ref="nickname"
                                    required />
                                <label class="form-label" for="form2Example18">Usuario</label>
                            </div>

                            <div class="form-outline mb-4">
                                <input type="password" id="form2Example28" class="form-control form-control-lg"
                                    ref="password" required />
                                <label class="form-label" for="form2Example28">Contraseña</label>
                            </div>
                            <!-- Agregar un div para mostrar el mensaje de error -->
                            <div v-if="error" class="alert alert-danger">
                                {{ error }}
                            </div>
                            <div class="pt-1 mb-4">
                                <button class="btn boton btn-lg btn-block" type="submit">Iniciar sesión</button>
                            </div>

                            <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">¿Olvidó su contraseña?</a></p>
                            <!-- <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p> -->

                        </form>

                    </div>

                </div>
                <div class="col-sm-6 px-0 d-none d-sm-block">
                    <img src="https://c4.wallpaperflare.com/wallpaper/922/335/699/man-made-medical-stethoscope-wallpaper-preview.jpg"
                        alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import { mapActions } from 'vuex';
export default {
    name: 'LoginView',
    data() {
        return {
            error: null // Agregar la propiedad "error" en data
        };
    },
    methods: {
        login() {
            // Datos de inicio de sesión
            let operation = "queryLogin";
            let tna = 6;
            const nickname = this.$refs.nickname.value
            const passwordUser = this.$refs.password.value
            let key = "11e2e476-717b-4898-ac02-693abdecdc9b"
            console.log(nickname, passwordUser)
            // Realizar una solicitud a la API
            fetch(
                "https://redb.qsystems.co/QS3100/QServlet?operation=" +
                operation +
                "&tna=" +
                tna +
                "&key=" +
                key +
                "&nickname=" +
                nickname +
                "&passwordUser=" +
                passwordUser
            )
                .then((respuesta) => respuesta.json())

                .then((datosRespuesta) => {
                    console.log(datosRespuesta);
                    if (datosRespuesta["message"] === "Usuario logueado exitosamente") {
                        console.log("Login válido");
                        console.log(datosRespuesta["userVO"]); // Asegúrate de que esto contenga la información del usuario
                        this.usuario = datosRespuesta["userVO"];
                        localStorage.setItem("user", JSON.stringify(this.usuario));
                        window.location.href = "../"

                    } else {
                        console.log("Login NO válido");
                        console.log(datosRespuesta["error"]);
                        this.error = datosRespuesta["error"]; // Establece el mensaje de error
                    }
                })
                .catch(console.log);
        }

    },
}

</script>

<style lang="scss" scoped>
.text-dark-alt {
    color: var(--dark-alt);
}

.logo img {
    width: 100px;
}

.boton {
    background-color: #5cb7e1;
    color: white;
    /* Cambia el color del texto según sea necesario */
    border-radius: 10px;

}
</style>
